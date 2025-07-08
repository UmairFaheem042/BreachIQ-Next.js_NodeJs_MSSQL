# 🔐 BreachIQ – Full Stack App

BreachIQ is a secure full stack web application that allows users to track and manage their email breach history using the LeakCheck API. The frontend is built using **Next.js 15**, while the backend leverages **Node.js, Express.js, and MS SQL**.

---

## ✨ Live Demo

> Coming soon...

---

# 🧩 Frontend – Next.js

## ⚙️ Tech Stack for Frontend

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + DaisyUI
- **Animations:** Framer Motion
- **API Handling:** Axios (with server actions)
- **Notifications:** React Toastify
- **Authentication:** Cookie-based, protected routes
- **State Management:** Minimal, local component state

---

## 🚀 Getting Started with Frontend

### 1. Clone the repo

```bash
git clone https://github.com/umairfaheem042/BreachIQ-Next.js_NodeJs_MSSQL.git
cd breach_iq_frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the app

```bash
npm run dev
# or
yarn dev
```

---

## 🛡️ Protected Routes

Routes like `/dashboard` and `/history` are protected using **Next.js Server Components + Server Actions**. If the user is unauthenticated, they are redirected to `/login`.

---

## 📸 Screenshots

> Add screenshots or GIFs here to showcase your UI.

---

# 🧠 Backend – Node.js + Express

## 📄 Description

The backend handles user authentication, email tracking, and breach history logging using a third-party API.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MS SQL (via Sequelize ORM)
- Google OAuth & JWT Authentication
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

### 1. Clone the repository

```bash
git clone https://github.com/umairfaheem042/BreachIQ-Next.js_NodeJs_MSSQL.git
cd breach-iq-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file and add the following

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

### 4. Run the development server

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

---

## 👨‍💻 Author

**Umair Faheem**  
[GitHub](https://github.com/UmairFaheem042) | [Portfolio](https://umairfaheem.framer.website)
