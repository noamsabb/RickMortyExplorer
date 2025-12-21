# Rick and Morty Explorer

Welcome to the Rick and Morty Explorer! This project provides a fun and interactive way to explore the characters and universe of Rick and Morty.

## Getting Started

Follow the instructions below to set up and run the project:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (with npm)

### Installation and Setup

1. Clone this repository to your local machine using Git:
   ```bash
   git clone https://github.com/<your-username>/RickMortyExplorer.git
   cd RickMortyExplorer
   ```

2. **Configure the Backend Environment** (Optional but Recommended):
   
   While the backend will run with default values, it's recommended to set up your environment variables:
   
   - Navigate to the `Backend` directory
   - Copy the `.env.example` file and rename it to `.env`:
     ```bash
     cd Backend
     cp .env.example .env
     ```
   - The `.env` file contains the API URL for the Rick and Morty API. You can modify it if needed.
   - **Note**: If you skip this step, the application will still work using default configuration values.

3. Open **two separate terminal windows**:
    1. Navigate to the `frontend` directory in one terminal.
    2. Navigate to the `backend` directory in the other terminal.

4. Run the following command **in each terminal** to install the necessary modules:
    ```bash
    npm install
    ```

### Running the Application

1. In both terminals, start the frontend and backend by running the following command:
    ```bash
    npm start
    ```

2. The backend and frontend should launch. Once everything is running, your browser should automatically open. If it doesn't, go to [http://localhost:4000](http://localhost:4000).

    - The frontend will be hosted at [http://localhost:4000](http://localhost:4000).
    - The backend will run on its designated port.
