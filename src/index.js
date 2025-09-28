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
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Test route to check server
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is working perfectly!',
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler - Fixed for Express v5
app.use('/*path', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// For Vercel deployment - export the app
export default app;