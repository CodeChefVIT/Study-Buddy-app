import cors from "cors";
import type { Application } from "express";
import Log from "./Log";

class Cors {
  public static init(_app: Application): Application {
    Log.info("Initializing CORS middleware");

    const corsOptions = {
      origin: ["http://localhost:4000", "http://localhost:3000", "*"],
      optionsSuccessStatus: 200,
      credentials: true,
    };
    _app.use(cors(corsOptions));

    return _app;
  }
}

export default Cors;
