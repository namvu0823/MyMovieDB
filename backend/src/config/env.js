// import dotenv from "dotenv";
// if (!process.env.RAILWAY_ENVIRONMENT) {
//   dotenv.config({ path: "./.env" });
// }

console.log("ENV DEBUG:", {
  keys: Object.keys(process.env),
  TMDB_AUTH: process.env.TMDB_AUTH ? "EXISTS" : "MISSING",
});

export const PORT = process.env.PORT;
export const TMDB_AUTH=process.env.TMDB_AUTH;
export const JWT_SECRET= process.env.JWT_SECRET;
