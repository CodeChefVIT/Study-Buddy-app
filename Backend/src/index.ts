import App from "./providers/App";
import Log from "./middlewares/Log";

App.loadDatabase();
App.loadServer();

// Language: typescript
process.on("uncaughtException", (exception) => Log.error(exception.stack));

// Catch the Process's warning event
process.on("warning", (warning) => Log.info(warning.stack));
