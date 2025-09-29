// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";

// const app = express();

// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "API running" });
// });

// export default app;


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// CORS config — allow frontend origin, adjust accordingly
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});
