import dotenv from 'dotenv';


dotenv.config();

export const ENV_VARS = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    TMDB_API_KEY: process.env.TMDB_API_KEY,
};