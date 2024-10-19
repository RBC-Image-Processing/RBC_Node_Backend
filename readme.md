RBC MidAp
Introduction
RBC conducts scientific research, provides diagnostic services, and implements innovative health interventions to protect the nation against diseases and other health threats.

The Backend
This repository contains the backend of the RBC MidAp application, which is responsible for handling API requests, managing the database, and serving data to the frontend. Below are the steps to set up and run the backend locally.

Prerequisites
Node.js: Ensure you have Node.js installed (version 18.18.0 or higher recommended for compatibility).
PostgreSQL: Make sure you have access to a PostgreSQL database.
npm: Use npm (version 9.8.0 or higher recommended) to manage packages.
Setup Instructions
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd midApBackend
Create a .env File:

Copy the content of .env.example to a new file named .env:
bash
Copy code
cp .env.example .env
Set your own environment variables like DATABASE_URL, PORT, and any other required settings.
Install Dependencies:

bash
Copy code
npm install
Database Setup:

Run Migrations:
bash
Copy code
npm run migrate
Seed Primary Data:
bash
Copy code
npm run seed
Start the Server:

Development Mode:
bash
Copy code
npm run dev
Production Mode:
bash
Copy code
npm start
Run Tests:

Run All Tests:
bash
Copy code
npm run test
Run Tests in Development Mode:
bash
Copy code
npm run test:dev
API Documentation
The API documentation is available at:
bash
Copy code
<app-url>/api-doc
Replace <app-url> with your deployed application's URL or localhost:<PORT> when running locally.
Notes
SSL Database Connections: Ensure that SSL configurations are set properly in config/db.js for production environments.
Undo Migrations:
To undo all migrations, run:
bash
Copy code
npm run undo:migrations
To undo just the last migration, run:
bash
Copy code
npm run undo:last:migration
Deployment
This application is designed to be deployed on platforms like Render.
Make sure the DATABASE_URL and other environment variables are correctly set for the production environment.
For running migrations and seeds automatically, consider using environment variables like RUN_MIGRATIONS and conditionally run them in the startup script.
Common Issues
SSL/TLS Required Error: If you encounter SSL/TLS errors while connecting to the database, ensure that the dialectOptions in the database configuration include:
javascript
Copy code
ssl: {
  require: true,
  rejectUnauthorized: false,
}
At this point, your backend application should be ready to handle requests and serve data to the frontend.

This README now includes comprehensive instructions for setup, database management, running the server, and handling common issues like SSL configuration. Let me know if you need any more information!
