import dotenv from "dotenv"; // npm i dotenv

// Load .env file into process.env object.
dotenv.config({ quiet: true });

class AppConfig {
    public readonly port = 4000;
    public readonly apiUrl =  process.env.API_URL!;
}

export const appConfig = new AppConfig();
