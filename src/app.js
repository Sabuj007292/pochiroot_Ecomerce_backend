import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

export default app;
