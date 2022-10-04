import jwt from "jsonwebtoken";
import { IUserModel } from "../models/User.model";

export default class JwtSign {
  public static sign(user: IUserModel): string {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 1 day
      }
    );
    return token;
  }
}
