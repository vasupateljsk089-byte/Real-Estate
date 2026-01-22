import {Router} from 'express';
import {register,login,logout,forgotPassword,verifyOtp,resetPassword,refreshTokens, getMe} from '@controllers/auth.controller';
const router=Router();

router.get("/me",getMe);
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/refresh",refreshTokens);


export default router;