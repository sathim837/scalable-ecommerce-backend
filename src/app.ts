import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { globalErrorHandler } from "./common/middleware/error.middleware";
import v1Routes from "./routes/v1";
import path from "path";

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(morgan("dev"));

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});



app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads"),
  ),
);

app.use("/api/v1", v1Routes);

app.use(globalErrorHandler);

export default app;

