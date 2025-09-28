// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);

// // Connect DB & start server
// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () =>
//     console.log(`🚀 Server running on http://localhost:${PORT}`)
//   );
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // <-- correct import
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

// Export for Vercel
export default app;
