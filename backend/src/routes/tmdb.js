import express from "express";

import {
    search_keyword,
    getType_Catergory,
    getGenre,
    getImage,
    getPopular,
} from "../controllers/tmdb.js"

import{
    download
}from"../controllers/image.js"

import{
    getMovieTrending,
    getMovieUpcoming,
    getMovieById,
    getMovieCredit,
    getMovieCertification,
    getMovieMedia,
    getMovieRecommendation,
    getMovieKeyword
}from "../controllers/movie.js"

import {
    getTvEp_Upcoming
} from "../controllers/tv.js"



const router = express.Router();

router.get("/popular",getPopular);
router.get("/search",search_keyword);
router.get("/type_cater",getType_Catergory);
router.get("/genre",getGenre);
router.get("/image",getImage);
router.get("/download",download);


router.get("/mv_trending",getMovieTrending);
router.get("/mv_upcoming",getMovieUpcoming);
router.get("/mv_id",getMovieById);
router.get("/mv_credit",getMovieCredit);
router.get("/mv_certification",getMovieCertification);
router.get("/mv_media",getMovieMedia);
router.get("/mv_recommendation",getMovieRecommendation);
router.get("/mv_keyword",getMovieKeyword);


router.get("/tv_ep_upcoming",getTvEp_Upcoming);

export default router;
