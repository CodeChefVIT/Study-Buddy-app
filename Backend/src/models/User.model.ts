import mongoose from "../providers/Database";
import bcryptjs from "bcryptjs";
import { v4 } from "uuid";
import Token from "./token.model";
import SendEmail from "../services/sendEmail";
import Jwt from "../services/jwtSign";
export interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
  regno: string;
  graduatingYear: number;
  major: string;
  avatar: string;
  bio: string;

  password: string;
  isVerified: boolean;
  verifyHash: string;
  comparePassword: (password: string) => Promise<boolean>;
  createToken: () => object;
  renewToken: (refreshToken: string) => object;
}

const UserSchema = new mongoose.Schema<IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  regno: { type: String, default: null },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  graduatingYear: { type: Number, default: null },
  major: { type: String, default: null },
  avatar: {
    type: String,
    default:
      "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  },
  bio: { type: String, default: null },
  verifyHash: { type: String },
});

UserSchema.pre<IUserModel>("save", async function (next) {
  const user = this as IUserModel;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(user.password, salt);
    user.password = hash;
    const subject = "Verify your email";
    const verifyHash = v4();
    user.verifyHash = verifyHash;
    const link =
      "http://" + process.env.VERIFY_LINK + "/" + user._id + "/" + hash;
    const message = `Please click on the link to verify your email: ${link}`;
    await SendEmail.verify(user.email, subject, message);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUserModel;
  const isMatch = await bcryptjs.compare(candidatePassword, user.password);
  return isMatch;
};

UserSchema.methods.createToken = function () {
  const user = this as IUserModel;
  const token = Jwt.sign(user);
  let expiredDate = new Date();
  expiredDate.setDate(expiredDate.getDate() + 1);

  let _refreshToken = v4();
  const refreshToken = new Token({
    token: _refreshToken,
    user: user._id,
    expiryDate: expiredDate,
  });
  return { accessToken: token, refreshToken: refreshToken };
};

UserSchema.methods.renewToken = async function (refreshToken: string) {
  const token = await Token.findOne({ token: refreshToken });
  if (!token) {
    throw new Error("Invalid refresh token");
  }
  const user = await User.findById(token.user);
  if (!user) {
    throw new Error("Invalid user");
  }
  if (token.expiryDate < new Date()) {
    throw new Error("Refresh token expired");
  }
  const newToken = Jwt.sign(user);
  return { accessToken: newToken, refreshToken: token };
};

const User = mongoose.model<IUserModel>("User", UserSchema);

export default User;
