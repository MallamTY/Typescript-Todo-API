import express from "express";
import { registerUser } from "../controller/userController";

const router = express.Router();


router.route('/sign-up').post(registerUser);




export default router;