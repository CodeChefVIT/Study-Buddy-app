import type { Application } from "express";
import CORS from "./Cors";
import Http from "./Http";

class Kernel {
  public static init(_app: Application): Application {
    _app = CORS.init(_app);
    _app = Http.init(_app);
    return _app;
  }
}
export default Kernel;
