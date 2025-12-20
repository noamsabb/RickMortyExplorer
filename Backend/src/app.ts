import cors from "cors";
import express from "express";
import { appConfig } from "./2-utils/app-config";
import { dataController } from "./5-controllers/data-controller";
import { errorMiddleware } from "./6-middleware/error-middleware";
import { logsMiddleware } from "./6-middleware/logs-middleware";

class App {

    public async start(): Promise<void> {


        // Create the server object: 
        const server = express();

        server.use(cors()); // Allow access from any client.

        // Tell express to create request.body from the HTTP Request body json:
        server.use(express.json());

        // Logs middleware - must be before routes
        server.use(logsMiddleware.logRequest);

        // Listen to controller routes: 
        server.use(dataController.router);

        // Route not found middleware: 
        server.use(errorMiddleware.routeNotFound);

        // Catch-all middleware: 
        server.use(errorMiddleware.catchAll);

        // Run server: 
        server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
    }

}

const app = new App();
app.start();
