import dotenv from "dotenv";
dotenv.config();

// SERVER
export const running_port = process.env.PORT || 3000;

// DATABASE
export const db_name = process.env.DB_NAME;
export const db_user = process.env.DB_USER;
export const db_password = process.env.DB_PASSWORD;
export const db_host = process.env.DB_HOST;

// API
export const api_url = process.env.LEAKCHECK_API_BASE_URL;

// OAUTH
export const google_client_id = process.env.GOOGLE_CLIENT_ID;
export const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

// export const OAUTH_EXCHANGE_EXPIRY = 10 * 60 * 1000;
export const OAUTH_EXCHANGE_EXPIRY = 24 * 60 * 60 * 1000;

export const jwt_secret = process.env.JWT_SECRET;

export const node_environment= process.env.NODE_ENV;

export const client_url = process.env.CLIENT_URL;