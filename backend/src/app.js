import express from"express";
import cors from "cors";
import router from "./routes/tmdb.js";
import userRouter from "./routes/user.js";

import './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",router);
app.use("/api/user", userRouter);

export default app;