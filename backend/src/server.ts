import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import appRoutes from "./routes/appRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// Mount authentication routes
app.use("/api/auth", authRoutes);
// Mount application routes
app.use("/api/applications", appRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
