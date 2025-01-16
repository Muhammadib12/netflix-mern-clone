import express from 'express';
import {getTrendinMovies,getMovieTrailer,getMovieDetails,getSimilarMovies,getMoviesByCategory} from '../controller/movie.controller.js';

const router = express.Router();



router.get("/trending",getTrendinMovies);
router.get("/:id/trailers",getMovieTrailer);
router.get("/:id/details",getMovieDetails);
router.get("/:id/similar",getSimilarMovies);
router.get("/:category",getMoviesByCategory);

export default router;