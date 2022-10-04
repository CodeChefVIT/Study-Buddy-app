import { NextFunction, Response } from "express";
import Request from "../interfaces/IRequest";
import jwt from "jsonwebtoken";

// export func
export const authorise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtsecret = process.env.JWT_SECRET;
  let token: string = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided.",
    });
  }
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, jwtsecret, (err: Error, decoded: any) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: "Invalid Token",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      error: "Invalid Token",
    });
  }
};
