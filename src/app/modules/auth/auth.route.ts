import express from "express";
import { AuthController } from "./auth.controller";
const router = express.Router();
router.post("/sing-up", AuthController.signUpUser);
router.post("/sing-in", AuthController.loginUser);
router.post("/forget-password", AuthController.forgetPassword);
export const AuthRouter = router;
