# Mploycheck Assignment

This repository contains two apps:

- `backend/` - Node.js, Express, and MongoDB API
- `frontend/` - Angular client application

## Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB connection string

## Project Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd "Mploycheck_Assignment fullstack"
```

### 2. Configure the backend

Create a `backend/.env` file with these values:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Install backend dependencies and start the API:

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:3000` by default.

### 3. Configure the frontend

The Angular app proxies API requests from `/api` to the backend in development through [frontend/proxy.conf.json](frontend/proxy.conf.json).

Install frontend dependencies and start the app:

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:4200` by default.

## Running the project

Start both services in separate terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm start
```

Then open `http://localhost:4200` in your browser.

## Available Scripts

### Backend

- `npm run dev` - Start the Express server with nodemon

### Frontend

- `npm start` - Start the Angular development server
- `npm run build` - Create a production build
- `npm test` - Run unit tests

## Notes

- The backend uses MongoDB and JWT-based authentication.
