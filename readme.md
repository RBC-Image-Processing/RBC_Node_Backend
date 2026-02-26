# RBC MIDaP - Node.js Backend

## Project Overview

RBC MIDaP (Medical Image Diagnostic and Processing) is a PACS middleware application built for Rwanda Biomedical Centre. This Node.js backend serves as the central API layer, connecting the React frontend to an Orthanc PACS server and a Python-based ML service for automated chest X-ray analysis.

## Architecture

```
Frontend (React)
    |
    v
Node.js Backend (this repo)  <-->  PostgreSQL
    |                |
    v                v
Orthanc PACS     Python ML Backend
(DICOM storage)  (Pneumonia detection + AI interpretation)
```

- **Frontend** sends API requests to this backend for authentication, patient/study management, and interpretations.
- **This backend** proxies DICOM operations to Orthanc, forwards images to the ML service, and stores interpretations/comments in PostgreSQL.
- **Orthanc PACS** stores and serves DICOM medical images.
- **Python ML Backend** runs a CNN model for pneumonia detection and generates clinical interpretations via Gemini/Groq/OpenAI.

## Prerequisites

- **Node.js** v18.18.0+ (with npm 9.8.0+)
- **PostgreSQL** 14+
- **Orthanc PACS** server (for DICOM image storage)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/RBC-Image-Processing/RBC_Node_Backend.git
cd RBC_Node_Backend
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your actual values (see [Environment Variables](#environment-variables) below).

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up the Database

Create a PostgreSQL database, then run migrations and seeders:

```bash
# Run all migrations
npm run migrate

# Seed initial data (roles, default admin user)
npm run seed
```

### 5. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on the port specified in your `.env` file (default: `5002`).

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5002` |
| `APP_URL` | Application base URL | `http://localhost` |
| `NODE_ENV` | Environment (`development`, `test`, `production`) | `development` |
| `DATABASE_URL` | Production PostgreSQL connection string | `postgres://user:pass@127.0.0.1:5432/midap_db` |
| `DEV_DATABASE_URL` | Development PostgreSQL connection string | `postgres://user:pass@127.0.0.1:5432/midap_dev_db` |
| `TEST_DATABASE_URL` | Test PostgreSQL connection string | `postgres://user:pass@127.0.0.1:5432/midap_test_db` |
| `JWT_SECRET_KEY` | Secret key for signing JWT tokens | A long random string |
| `EMAIL` | Gmail address for sending emails | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (not your regular password) | `xxxx xxxx xxxx xxxx` |
| `PACS_BASE_URL` | Orthanc PACS server URL | `http://localhost:8042` |
| `PACS_USERNAME` | Orthanc authentication username | `orthanc` |
| `PACS_PASSWORD` | Orthanc authentication password | `orthanc123` |
| `AI_SERVICE` | Python ML backend URL | `http://localhost:8000` |

> **Note:** For `EMAIL_PASS`, use a Gmail App Password. Go to Google Account > Security > 2-Step Verification > App passwords to generate one.

## Database Setup

### PostgreSQL

Create the required databases:

```sql
CREATE DATABASE midap_app_db;
CREATE DATABASE midap_app_db_test;
```

### Migrations

```bash
npm run migrate              # Run all pending migrations
npm run undo:last:migration  # Undo the last migration
npm run undo:migrations      # Undo all migrations
```

### Seeders

```bash
npm run seed  # Seed roles and default users
```

### Database Models

| Model | Description |
|-------|-------------|
| Role | User roles (Non-Specialist, Physician, Radiologist, Administrator) |
| User | System users with role-based access |
| AIInterpretation | AI model predictions for studies |
| RadiologistInterpretation | Radiologist diagnoses for studies |
| DoctorComment | Doctor feedback on AI interpretations |

## Running the Server

| Command | Description |
|---------|-------------|
| `npm run dev` | Development mode with auto-reload (Babel + Nodemon) |
| `npm start` | Production mode (builds then runs from `dist/`) |
| `npm run build` | Compile ES6+ source to `dist/` via Babel |
| `npm run deploy` | Run migrations + seeders (for CI/CD) |

## API Endpoints

All routes are prefixed with `/api`. API documentation is available at `/api-doc` (Swagger UI).

| Route Group | Base Path | Description |
|-------------|-----------|-------------|
| Auth | `/api/auth` | Login, password reset, change password |
| Users | `/api/user` | CRUD operations, account activation |
| Patients | `/api/patient` | Patient listing and details (from PACS) |
| Studies | `/api/study` | Study listing, details, DICOM upload |
| Images | `/api/image` | Image retrieval from PACS |
| AI Interpretation | `/api/interpret` | AI-powered image interpretation |
| Radiologist Interpretation | `/api/interpretation` | Radiologist diagnoses |
| Doctor Comments | `/api/doctor-comments` | Doctor feedback on AI results |
| Health Check | `/api/ping` | Server health check |

### Authentication

All routes (except `/api/auth/login` and `/api/ping`) require a Bearer token:

```
Authorization: Bearer <jwt-token>
```

### User Roles

| Role | ID | Access Level |
|------|----|-------------|
| Non-Specialist | 1 | View studies, add comments |
| Physician | 2 | View studies, add comments |
| Radiologist | 3 | View studies, add interpretations |
| Administrator | 4 | Full access, user management |

## Orthanc/PACS Integration

This backend communicates with an Orthanc PACS server for DICOM image storage and retrieval.

### Setting Up Orthanc

1. Install Orthanc from [orthanc-server.com](https://www.orthanc-server.com/download.php) or run via Docker:

   ```bash
   docker run -p 8042:8042 -p 4242:4242 --name orthanc jodogne/orthanc-plugins
   ```

2. Set credentials in your `.env`:

   ```
   PACS_BASE_URL=http://localhost:8042
   PACS_USERNAME=orthanc
   PACS_PASSWORD=orthanc123
   ```

3. The backend uses Basic Auth to communicate with Orthanc and includes a 20-minute in-memory cache for PACS responses.

### DICOM Upload

Upload DICOM files via `POST /api/study/upload` (multipart/form-data):
- Accepts `.dcm` files with MIME type `application/dicom`
- Maximum file size: 100MB per file
- Maximum 50 files per request

## Testing

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:dev
```

Tests use Jest + Supertest and run against the `TEST_DATABASE_URL` database.

## Project Structure

```
RBC_Node_Backend/
├── src/
│   ├── app.js                   # Express app setup, middleware, routes
│   ├── index.js                 # Server entry point
│   ├── config/
│   │   └── db.js                # Sequelize database configuration
│   ├── controllers/             # Request handlers
│   ├── routes/                  # Route definitions
│   ├── services/
│   │   ├── ApiService.js        # PACS/Orthanc HTTP client
│   │   ├── StudyService.js      # Study business logic
│   │   └── AiIntepretationService.js  # ML backend integration
│   ├── middlewares/             # Auth, role-check, file handling
│   ├── database/
│   │   ├── models/              # Sequelize models
│   │   ├── migrations/          # Database migrations
│   │   └── seeders/             # Database seeders
│   ├── utils/                   # JWT, email, response helpers
│   └── doc/                     # Swagger/OpenAPI specs
├── __test__/                    # Jest test files
├── .env.example                 # Environment variable template
├── package.json
└── readme.md
```

## Troubleshooting

### SSL/TLS Database Error

If you get SSL errors connecting to PostgreSQL in production, ensure `src/config/db.js` includes:

```javascript
dialectOptions: {
  ssl: { require: true, rejectUnauthorized: false }
}
```

### PACS Connection Refused

- Verify Orthanc is running: `curl http://localhost:8042/system`
- Check `PACS_BASE_URL`, `PACS_USERNAME`, and `PACS_PASSWORD` in `.env`
- Ensure Orthanc's HTTP port (default 8042) is not blocked by a firewall

### Build Errors

- Ensure you're using Node.js v18.18.0+
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Clear the `dist/` folder: `rm -rf dist && npm run build`

### Email Not Sending

- Use a Gmail App Password, not your regular Gmail password
- Enable 2-Step Verification on your Google account first
- Check that `EMAIL` and `EMAIL_PASS` are set correctly in `.env`

### AI Service Unreachable

- Ensure the Python ML backend is running on the URL specified in `AI_SERVICE`
- Default: `http://localhost:8000`
- Test with: `curl http://localhost:8000/`
