import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import appRoutes from "./routes/appRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", appRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
