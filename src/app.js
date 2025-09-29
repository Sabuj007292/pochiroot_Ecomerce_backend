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
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile/profile.js";

dotenv.config();

// Validate env variables
if (!process.env.MONGO_URI) {
  throw new Error("❌ MONGO_URI missing in .env");
}
if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET missing in .env");
}

const app = express();

// CORS config
const allowedOrigins = [
  "http://localhost:5173",                    // local frontend
  "https://pochiroot-ecomerce.vercel.app",   // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: No access from origin ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // ✅ Profile API

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running", env: process.env.NODE_ENV || "development" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

export default app;
