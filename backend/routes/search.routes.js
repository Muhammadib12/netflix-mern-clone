import express from 'express';

import {searchPerson,searchMovie,searchTv,getHistory} from '../controller/search.controller.js';
import { removeItemFromSearchHistory } from '../controller/search.controller.js';


const router = express.Router();


router.get('/person/:query',searchPerson);
router.get('/movie/:query',searchMovie);
router.get('/tv/:query',searchTv);

router.get('/history',getHistory);

router.delete("/history/:id",removeItemFromSearchHistory);

export default router;