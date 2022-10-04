import type { Application } from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import Log from "./Log";
import bodyparser from "body-parser";

class Http {
  public static init(_app: Application): Application {
    Log.info("Initializing HTTP middleware");

    _app.use(hpp());
    _app.use(helmet());
    _app.use(bodyparser.json());
    _app.use(bodyparser.urlencoded({ extended: true }));

    _app.use(compression());

    return _app;
  }
}

export default Http;
