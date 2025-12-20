import { NextFunction, Request, Response } from "express";

class LogsMiddleware {

    // Request logging middleware
    public logRequest(request: Request, response: Response, next: NextFunction): void {
        const timestamp = new Date().toISOString();
        const method = request.method;
        const path = request.originalUrl;
        
        // Saving Original response methods
        const originalJson = response.json.bind(response);
        const originalSend = response.send.bind(response);

        let responseBody: any;

        // Override response.json to capture the body
        response.json = function(body: any) {
            responseBody = body;
            return originalJson(body);
        };

        // Override response.send to capture the body
        response.send = function(body: any) {
            responseBody = body;
            return originalSend(body);
        };

        // Log when response finishes
        response.on('finish', () => {
            const statusCode = response.statusCode;
            
            // Trim response body to 200 characters
            let trimmedBody = '';
            if (responseBody) {
                const bodyString = typeof responseBody === 'string' 
                    ? responseBody 
                    : JSON.stringify(responseBody);
                trimmedBody = bodyString.length > 200 
                    ? bodyString.substring(0, 200) + '...' 
                    : bodyString;
            }

            console.log('\n=== REQUEST LOG ===');
            console.log(`Timestamp: ${timestamp}`);
            console.log(`Method: ${method}`);
            console.log(`Path: ${path}`);
            console.log(`Status Code: ${statusCode}`);
            console.log(`Response Body (trimmed): ${trimmedBody}`);
            console.log('===================\n');
        });

        next();
    }
}

export const logsMiddleware = new LogsMiddleware();