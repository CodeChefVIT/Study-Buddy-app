import mongoose from "mongoose";
import Log from "../middlewares/Log";

export class Database {
  public static async connect(): Promise<void> {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI);

      connection.connection.on("connected", () => {
        Log.info("Database :: Connected");
      });
      connection.connection.on("error", (err) => {
        Log.error(`Database :: Error: ${String(err.message)}`);
      });
      connection.connection.on("disconnected", () => {
        Log.info("Database :: Disconnected");
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Log.error(`Database :: Error: ${error.message}`);
      }
    }
  }
}

export default mongoose;
