import express from "express";
import Kernel from "../middlewares/Kernel";
import Log from "../middlewares/Log";
import Routes from "./Routes";
import dotenv from "dotenv";
import ExceptionHandler from "../exception/Handler";

dotenv.config();
class Express {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  public init(): any {
    const port = process.env.PORT || 3000;
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    // Registering Exception / Error Handlers
    this.express.use(ExceptionHandler.logErrors);
    this.express.use(ExceptionHandler.clientErrorHandler);
    this.express.use(ExceptionHandler.errorHandler);
    this.express = ExceptionHandler.notFoundHandler(this.express);

    this.express
      .listen(port, () => {
        console.log(
          "\x1b[33m%s\x1b[0m",
          `Server :: Running @ 'http://localhost:${port}'`
        );
      })
      .on("error", (_error) => {
        Log.error("Error: " + _error.message);
      });
  }

  private mountRoutes(): void {
    this.express = Routes.mount(this.express);
  }

  private mountMiddlewares(): void {
    this.express = Kernel.init(this.express);
  }
}

export default new Express();
