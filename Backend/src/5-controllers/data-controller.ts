import express, { Request, Response, Router } from "express";
import { dataService } from "../4-services/data-service";


class DataController {

    // Router object - holds all routes: 
    public router: Router = express.Router();


    public constructor() {
        //Receiving HTTP Request
        this.router.get("/api/characters", this.getAllCharacters);
    }

    // Get all characters from API
    private async getAllCharacters(request: Request, response: Response) {
        const characters = await dataService.getAllCharacters();
        //Send response
        response.json(characters);
    }
}

export const dataController = new DataController();
