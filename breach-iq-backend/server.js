import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import sequelize from "./config/db.js";
import router from "./routes/index.js"
import { running_port } from "./lib/constants.js";


// Express instance
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())

// Routes
app.use("/api/v1", router);


// Server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');

        app.listen(running_port, () => {
            console.log(`🚀 Server running on http://localhost:${running_port}`);
        });

    } catch (error) {
        console.error('❌ Failed to connect to database. Server not started.');
        console.error(error.message);
        process.exit(1);
    }
};

startServer();
