import express from "express";
import { Register } from '../controller/auth.controller';
import { Login } from '../controller/auth.controller';


const router = express.Router();

router.post("/register", Register)
router.post("/login", Login)

export default router;