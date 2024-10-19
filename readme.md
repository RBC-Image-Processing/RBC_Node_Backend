# RBC MidAp

## Introduction

RBC conducts scientific research, provides diagnostic services, and implements innovative health interventions to protect the nation against diseases and other health threats.

## The Backend

This repository contains the backend of the RBC MidAp application, which is responsible for handling API requests, managing the database, and serving data to the frontend. Below are the steps to set up and run the backend locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 18.18.0 or higher recommended for compatibility).
- **PostgreSQL**: Make sure you have access to a PostgreSQL database.
- **npm**: Use npm (version 9.8.0 or higher recommended) to manage packages.

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd midApBackend

1\. **Create a .env File**: 
Copy the content of `.env.example` to a new file named `.env`:
``` bash 
cp .env.example .env
```

Set your own environment variables like `DATABASE_URL`, `PORT`, and any other required settings. 

2. **Install Dependencies**:
 ``` bash
npm install
```  

4. **Database Setup**:
* Run Migrations:
``` bash
npm run migrate
```


* Seed Primary Data:
``` bash
npm run seed
```

4. **Start the Server**:
 * Development Mode:
``` bash
npm run dev
```

 * Production Mode:
``` bash
npm start
```

5. **Run Tests**:
* Run All Tests:
``` bash
npm run test
```


* Run Tests in Development Mode:
``` bash 
npm run test:dev
```

API Documentation The API documentation is available at: 
``` Bash /api-doc ``` Replace `` with your deployed application's URL or `localhost:` when running locally. 

Notes * **SSL Database Connections**:
Ensure that SSL configurations are set properly in `config/db.js` for production environments. 

* **Undo Migrations**: * To undo all migrations, run:
``` bash
npm run undo:migrations
```

* To undo just the last migration, run:
``` bash 
npm run undo:last:migration
```

Deployment This application is designed to be deployed on platforms like Render. 
* Make sure the `DATABASE_URL` and other environment variables are correctly set for the production environment.

* For running migrations and seeds automatically, consider using environment variables like `RUN_MIGRATIONS` and conditionally run them in the startup script.
*

Common Issues SSL/TLS Required Error If you encounter SSL/TLS errors while connecting to the database,
ensure that the `dialectOptions` in the database configuration include: 

``` javascript  
ssl: { require: true, rejectUnauthorized: false, }.
```
