import express, { json } from "express";
import cookieParser from "cookie-parser";
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import searchRoutes from './routes/search.routes.js';
import tvRoutes from "./routes/tvshows.routes.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import {protectedRoute} from './middleware/protectedRoute.js';


const app = express();

const __dirname = path.resolve();



app.use(express.json());
app.use(cookieParser())

const PORT = ENV_VARS.PORT || 3000;

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectedRoute,movieRoutes);
app.use("/api/v1/tv",protectedRoute,tvRoutes);
app.use("/api/v1/search",protectedRoute,searchRoutes);

// Serve frontend in production
if (ENV_VARS.NODE_ENV === "production") {
    // Serve static files from frontend/dist
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
  
    // Handle fallback for SPA
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  }


app.listen(PORT,() =>{
    console.log(`App running in http://localhost:${PORT}`);
    connectDB();
});





