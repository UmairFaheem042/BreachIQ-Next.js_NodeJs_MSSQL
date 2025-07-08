import { Google } from "arctic";
import { google_client_id, google_client_secret } from "./constants.js";

// Create a Google OAuth Client instance
export const google = new Google(
    google_client_id,
    google_client_secret,
    "http://localhost:5000/api/v1/users/google/callback"
);


export const getUserWithAuthId = async ({ provider, email }) => { }