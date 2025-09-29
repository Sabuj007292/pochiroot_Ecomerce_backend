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
import authRoutes from "./routes/auth.js";

const app = express();

// ✅ Proper CORS config
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pochiroot-ecomerce.vercel.app" // Replace with actual frontend domain
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

export default app;
