# Expense Management Backend (Node.js + TypeScript + MongoDB)

Backend API for an Expense Management system with:

- Employees submitting expense reimbursement requests\
- Line managers approving / rejecting expenses\
- Reporting roles (CA, Finance, HR, CEO, CTO, etc.) viewing expenses
  based on role\
- Admin onboarding users, managing roles, permissions, and categories\
- Notification events (console-based email simulation)\
- Role-based reports and CSV export

## 1. Tech Stack

- **Runtime**: Node.js (TypeScript)
- **Web Framework**: Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (Role + Permissions)
- **Other**: EventEmitter-based notification hooks, ts-node-dev for dev

## 2. Features Covered

- Employees submit expenses\
- Managers approve/reject\
- Reporting roles view filtered data\
- Admin manages users, roles, categories\
- Notifications on submission/approval/rejection/role assignment\
- CSV exports

## 3. Prerequisites

Node 18+, MongoDB local or via Docker.

## 4. Environment Configuration

Create `.env`:

    PORT=4000
    MONGO_URI=mongodb://127.0.0.1:27017/expense_db
    JWT_SECRET=super-secret-jwt-key

## 5. Start MongoDB

**Docker:**

    docker run -d --name expense-mongo -p 27017:27017 -v mongo-data:/data/db mongo:7

## 6. Install Dependencies

    npm install

## 7. Seed Database

    npm run seed

## 8. Run Dev Server

    npm run dev

## 9. Build & Start Production

    npm run build
    npm start

## 10. Sample Accounts

- admin@example.com / Admin@123\
- manager@example.com / Manager@123\
- employee@example.com / Employee@123
