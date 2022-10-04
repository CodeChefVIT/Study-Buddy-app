import type { Application } from "express";
import Log from "../middlewares/Log";
class Routes {
  public mount(_app: Application): Application {
    Log.info("Initializing routes");
    return _app;
  }
}

export default new Routes();
