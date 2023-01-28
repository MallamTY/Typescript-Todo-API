import express from "express";
import { registerUser, signIn } from "../controller/userController";

const router = express.Router();


router.route('/sign-up').post(registerUser);

router.route('/sign-in').post(signIn);


export default router;