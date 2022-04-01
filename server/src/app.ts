import express, { Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";
import postRoutes from "./routes/post.router";

import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config({ path: "./.env" });
const app: Application = express();

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);

export default app;
