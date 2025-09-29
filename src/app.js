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

const allowedOrigins = [
  "http://localhost:5173",
  "https://pochiroot-ecomerce.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

export default app;
