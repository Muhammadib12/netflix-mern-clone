import express from 'express';
import {getTrendinTv,getTvTrailer,getTvDetails,getSimilarTv,getTvByCategory} from '../controller/tvshows.controller.js';

const router = express.Router();


router.get("/trending",getTrendinTv);
router.get("/:id/trailers",getTvTrailer);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getSimilarTv);
router.get("/:category",getTvByCategory);



export default router;  