import { Application, NextFunction, Request, Response } from "express";
import Log from "../middlewares/Log";

class Handler {
  /**
   * Handles all the not found routes
   */
  public static notFoundHandler(_express: Application): any {
    _express.use("*", (req: Request, res: Response) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
      if (req.xhr || req.originalUrl.includes(`/api/`)) {
        return res.json({
          error: "Page Not Found",
        });
      } else {
        res.status(404);
        return res.send("Page Not Found");
      }
    });

    return _express;
  }

  /**
   * Handles your api/web routes errors/exception
   */
  public static clientErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    Log.error(err.stack);

    if (req.xhr) {
      return res.status(500).send({ error: "Something went wrong!" });
    } else {
      return next(err);
    }
  }

  /**
   * Show undermaintenance page incase of errors
   */
  public static errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    Log.error(err.stack);
    res.status(500);

    if (req.originalUrl.includes(`/api/`)) {
      if (err.name && err.name === "UnauthorizedError") {
        return res.json({
          error: ["Invalid Token!"],
        });
      }

      return res.json({
        error: err,
      });
    }

    return res.send("Under Maintenance");
  }

  /**
   * Register your error / exception monitoring
   * tools right here ie. before "next(err)"!
   */
  public static logErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    Log.error(err.stack);

    return next(err);
  }
}

export default Handler;
