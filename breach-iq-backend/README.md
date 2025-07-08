# 📦 BreachIQ - Backend

## 📄 Description

BreachIQ is a backend service built using Node.js, Express.js, and MS SQL that lets users check for email breaches using a third-party API. It handles user authentication, email tracking, and breach history logging.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MS SQL (via Sequelize ORM)
- JWT Authentication
- LeakCheck API

---

## 🚀 Features

- User Registration and Login with Google OAuth
- Track Email for Breach
- Fetch Breach History with Pagination
- Secure API using middleware
- Integrated with LeakCheck third-party API

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/umairfaheem042/breachiq-be.git
   cd breachiq-be
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file and add the following**

   ```env
    PORT=<your_server_port>
    DB_HOST=<yourhost_name or server_name>
    DB_USER=<database_user>
    DB_PASSWORD=<database_password>
    DB_NAME=<database_used>
    LEAKCHECK_API_BASE_URL=https://leakcheck.io/api/public
    GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_oauth_secret>
    JWT_SECRET=<your jwt_secret>
    NODE_ENV=<development or production>
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

| Method | Endpoint                                        | Description                  |
| ------ | ----------------------------------------------- | ---------------------------- |
| GET    | `/api/v1/users/oauth/google`                    | Register a new user          |
| GET    | `/api/v1/users/google/callback`                 | Google callback route        |
| POST   | `/api/v1/users/logout`                          | Log out user                 |
| GET    | `/api/v1/users/me`                              | Fetch logged in user info    |
| GET    | `/api/v1/tracked-emails/`                       | Get tracked email info       |
| GET    | `/api/v1/tracked-emails/track`                  | Perform a breach scan        |
| GET    | `/api/v1/tracked-emails/history?page=1&limit=5` | Get paginated breach history |
| GET    | `/api/v1/breaches/`                             | Get last breach history      |
| GET    | `/api/v1/breaches/all`                          | Get paginated breach history |
