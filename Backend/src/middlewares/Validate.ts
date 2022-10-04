import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

class Validate {
  public static body = (schema: Schema, errors?: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        let message = details.map((i) => i.message).join(",");
        if (errors) {
          message = errors;
        }
        res.status(422).json({ success: false, error: message });
      }
    };
  };
  public static params = (schema: Schema, errors?: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.params);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        let message = details.map((i) => i.message).join(",");
        if (errors) {
          message = errors;
        }
        res.status(422).json({ success: false, error: message });
      }
    };
  };
  public static query = (schema: Schema, errors?: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.query);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        let message = details.map((i) => i.message).join(",");
        if (errors) {
          message = errors;
        }
        res.status(422).json({ success: false, error: message });
      }
    };
  };
}

export default Validate;
