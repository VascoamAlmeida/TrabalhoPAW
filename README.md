# Textile Donation Platform

Academic full-stack web application for managing textile donation requests, beneficiary entities and a points-to-voucher reward system.

The project was originally developed as a **group academic assignment** for a Web Programming course. This repository is a cleaned portfolio version of that work: personal/group-identifying information, test credentials, runtime uploads and hard-coded secrets were removed.

## Overview

The application models a textile donation platform with two interfaces:

- **Backoffice** — Node.js, Express and EJS interface for administrators and employees.
- **Frontoffice** — Angular application for donors and beneficiary entities.

Data is stored in MongoDB through Mongoose, while the Angular client communicates with the backend through a documented REST API.

## Main features

### Backoffice

- Authentication with JWT-based sessions.
- Separate administrator and employee access.
- Management of users, beneficiary entities and donation requests.
- Approval of beneficiary entities before they can sign in to the frontoffice.
- Donation workflow management.
- Voucher management.
- Dashboard with donation statistics and charts.
- Swagger documentation for the REST API.

### Frontoffice

- Donor registration and authentication.
- Beneficiary entity registration with backoffice approval.
- Search and browsing of approved beneficiary entities.
- Creation of textile donation requests.
- Immediate points estimate using the original project rule of one point per donated item.
- Donor donation history and current points balance.
- Beneficiary donation history.
- Beneficiary workflow actions: accept, cancel and complete donation requests.
- Conversion of accumulated points into discount vouchers.

## Technology stack

- **Backend:** Node.js, Express.js, EJS
- **Frontend:** Angular 18, TypeScript, Angular Material, Bootstrap
- **Database:** MongoDB / Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **API documentation:** Swagger UI
- **Charts:** Google Charts

## Project structure

```text
.
├── backoffice/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── swagger/
│   ├── views/
│   ├── app.js
│   └── package.json
├── frontoffice/
│   ├── src/app/
│   ├── src/assets/
│   └── package.json
├── .env.example
└── README.md
```

## Requirements

- Node.js 20 or later recommended
- npm
- MongoDB (local installation or MongoDB Atlas)

## Configuration

The repository does **not** contain database passwords, JWT secrets or login credentials.

Set the following environment variables before starting the backend:

```text
MONGODB_URI=mongodb://127.0.0.1:27017/recicla_textil
JWT_SECRET=replace-with-a-random-secret
PORT=3000
```

`.env.example` is provided only as a reference. The current application reads the values from the process environment.

### PowerShell example

```powershell
$env:MONGODB_URI="mongodb://127.0.0.1:27017/recicla_textil"
$env:JWT_SECRET="development-secret"
```

## Installation

### 1. Backoffice / REST API

```bash
cd backoffice
npm install
npm start
```

The backend runs on `http://localhost:3000` by default.

Swagger UI is available at:

```text
http://localhost:3000/api/v1/api-docs
```

### 2. Create the first administrator

On a new database, set the administrator credentials in environment variables and run:

```powershell
$env:ADMIN_NAME="Administrator"
$env:ADMIN_EMAIL="admin@example.com"
$env:ADMIN_PASSWORD="choose-a-password"
npm run create-admin
```

No administrator password is stored in the repository.

### 3. Frontoffice

Open another terminal:

```bash
cd frontoffice
npm install
npm start
```

The Angular application runs on `http://localhost:4200`.

## Donation workflow

A donation request follows the original project states:

```text
Inicio -> Curso -> Fim
   |        
   └-> Cancelado
```

A donor creates a request in `Inicio`. The selected beneficiary entity may accept it (`Curso`) or cancel it. Once an accepted donation is completed, it moves to `Fim` and the donor receives the corresponding points.

## Security / portfolio cleanup

Before publication, the project was cleaned to avoid exposing development data:

- MongoDB credentials were removed from source code.
- The JWT secret is no longer hard-coded as a production credential.
- Test login credentials were removed.
- Password hashes are no longer returned by REST endpoints.
- Runtime-uploaded beneficiary logos are ignored by Git.
- Login passwords are no longer printed to the browser console.
- Backoffice access is restricted to administrators and employees.
- Entity workflow actions verify that the donation belongs to the authenticated entity.

## Notes

This repository intentionally stays close to the scope of the original academic assignment rather than turning it into a new production product. The purpose is to demonstrate the original full-stack work, architecture and required workflow with a small number of correctness and security fixes needed for a public portfolio repository.
