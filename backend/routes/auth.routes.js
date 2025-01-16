import express from "express";

const router = express.Router();

import {authCheck,signup,login,logout} from '../controller/auth.controller.js';
import {protectedRoute} from '../middleware/protectedRoute.js';

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/authCheck",protectedRoute,authCheck);

export default router;