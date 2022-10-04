import User, { IUserModel } from "../models/User.model";
import upload from "../services/s3Upload";
import multer from "multer";
import bcryptjs from "bcryptjs";
import { Response } from "express";
import { v4 } from "uuid";
import SendEmail from "../services/sendEmail";
import Request from "../interfaces/IRequest";

interface data {
  Location: string;
}

export default class UserController {
  public static async signup(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      confirm,
      regno,
      graduatingYear,
      major,
      bio,
    } = req.body;
    try {
      const user = await User.create({
        name,
        email,
        password,
        confirm,
        regno,
        graduatingYear,
        major,
        bio,
      });
      return res.status(200).json({ message: "User Created" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect Password" });
      }
      const token = user.createToken();
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
  public static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (!user.isVerified) {
        return res.status(401).json({ message: "User not verified" });
      }
      const verifyHash = v4();
      user.verifyHash = verifyHash;
      await user.save();
      const link =
        "https://" +
        process.env.frontendURL +
        "/user/reset/" +
        user.id +
        "/" +
        verifyHash;
      await SendEmail.verify(
        email,
        "Reset Password",
        `Reset your password at ${link}`
      );
      return res.status(200).json({
        success: true,
        message: "Check your email for reset link",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
  public static async verifyHash(req: Request, res: Response) {
    const { id, hash } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.verifyHash !== hash) {
        return res.status(401).json({ message: "Invalid Hash" });
      }
      return res.status(200).json({
        success: true,
        message: "Hash Verified",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
  public static async resetPassword(req: Request, res: Response) {
    const { id, hash } = req.params;
    const { password, confirm } = req.body;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.verifyHash !== hash) {
        return res.status(401).json({ message: "Invalid Hash" });
      }
      if (password !== confirm) {
        return res.status(401).json({ message: "Passwords do not match" });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      user.password = hashPassword;
      user.verifyHash = "";
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password Reset",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
  public static async verify(req: Request, res: Response) {
    const { id, hash } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.isVerified) {
        return res.status(401).json({ message: "User already verified" });
      }
      if (user.verifyHash !== hash) {
        return res.status(401).json({ message: "Invalid Hash" });
      }
      user.isVerified = true;
      user.verifyHash = "";
      await user.save();
      return res.status(200).json({
        success: true,
        message: "User Verified",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
  public static async resendVerification(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.isVerified) {
        return res.status(401).json({ message: "User already verified" });
      }
      const verifyHash = v4();
      user.verifyHash = verifyHash;
      await user.save();
      const link =
        "https://" +
        process.env.frontendURL +
        "/user/verify/" +
        user.id +
        "/" +
        verifyHash;
      await SendEmail.verify(
        email,
        "Verify Email",
        `Verify your email at ${link}`
      );
      return res.status(200).json({
        success: true,
        message: "Check your email for verification link",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
  public static async edit(req: Request, res: Response) {
    multer({
      storage: multer.memoryStorage(),
    }).single("avatar")(req, res, async (err) => {
      const { name, bio } = req.body;
      const { oldPass, newPass, confirmPass } = req.body;
      try {
        const currentUser = req.user as IUserModel;
        if (err) return res.status(400).json({ error: err.message });
        const user = await User.findById(currentUser.id);
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "User does not exist",
          });
        }
        // check for if file is uploaded
        if (name || bio || req.file) {
          if (name) {
            user.name = name;
          }
          if (bio) {
            user.bio = bio;
          }
          if (req.file) {
            const { originalname, buffer } = req.file;
            const allowedExtensions = /(jpg|jpeg|png|gif|webp)$/i;
            const fileExtension = originalname.split(".").pop();
            if (!allowedExtensions.test(fileExtension)) {
              return res.status(401).json({
                success: false,
                error: "Not an image",
              });
            }
            const data2 = await upload(currentUser.id, buffer, originalname);
            const data = data2 as data;
            if (!data2) {
            }
            user.avatar = data.Location;
          }
          await user.save();
          return res.status(200).json({
            success: true,
            message: "User updated",
            data: {
              name: user.name,
              avatar: user.avatar,
              bio: user.bio,
            },
          });
        }
        if (!(oldPass && newPass && confirmPass)) {
          return res.status(400).json({
            success: false,
            message: "Please fill all the fields",
          });
        }
        const isMatch = await bcryptjs.compare(oldPass, user.password);
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Incorrect password",
          });
        }
        if (newPass) {
          if (newPass !== confirmPass) {
            return res.status(400).json({
              success: false,
              message: "Passwords do not match",
            });
          }
          const salt = await bcryptjs.genSalt(10);
          user.password = await bcryptjs.hash(newPass, salt);
        }
        await user.save();
        return res.json({
          success: true,
          message: "Password updated",
          data: {
            name: user.name,
            avatar: user.avatar,
            bio: user.bio,
          },
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: "Server error",
        });
      }
    });
  }
  public static async get(req: Request, res: Response) {
    try {
      const currentUser = req.user as IUserModel;
      const user = await User.findById(currentUser.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      return res.status(200).json({
        success: true,
        data: {
          name: user.name,
          avatar: user.avatar,
          bio: user.bio,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
}
