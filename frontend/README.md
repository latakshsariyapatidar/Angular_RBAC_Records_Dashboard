# Frontend

Angular client for the RBAC dashboard.

## Prerequisites

- Node.js 18+ installed
- npm installed
- Backend running on `http://localhost:3000`

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open `http://localhost:4200` in your browser.

## API Proxy

Development API calls from `/api` are proxied to the backend using [proxy.conf.json](proxy.conf.json).

## Available Scripts

- `npm start` - Run the Angular development server
- `npm run build` - Build the app for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Project Structure

- `src/app/core/` - guards and shared services
- `src/app/features/` - feature modules such as auth, records, and admin user management
- `src/app/dashboard/` - dashboard layout
- `src/app/shared/` - shared UI components and interfaces

