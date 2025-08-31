import express from "express";

import {
    getTrendingDay,
    getTrendingWeek,
    getUpcoming,
    getPopular,
    getMovieById,
    getCredit,
    search_keyword,
    getType
} from "../controllers/tmdb.js"

const router = express.Router();
router.get("/trending_day",getTrendingDay);
router.get("/trending_week",getTrendingWeek);
router.get("/popular",getPopular);
router.get("/upcoming",getUpcoming);
router.get("/movie_id",getMovieById);
router.get("/credit",getCredit);
router.get("/search",search_keyword);
router.get("/type_cate",getType);

export default router;
