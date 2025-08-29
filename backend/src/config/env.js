import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT||5000;
export const TMDB_AUTH=process.env.TMDB_AUTH;
export const JWT_SECRET= process.env.JWT_SECRET;