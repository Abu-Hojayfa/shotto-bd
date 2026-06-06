import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import {
  signupValidator,
  loginValidator,
  googleAuthValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from '../validators/auth.validator';
import { signupLimiter, loginLimiter } from '../middleware/rateLimiter';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/signup',          signupLimiter, signupValidator,         authController.signup);
router.post('/login',           loginLimiter,  loginValidator,          authController.login);
router.post('/logout',          protect,                                authController.logout);
router.post('/refresh',                                                 authController.refresh);
router.get ('/me',              protect,                                authController.me);

// Google OAuth & Password Recovery
router.post('/google',          loginLimiter,  googleAuthValidator,     authController.googleAuth);
router.post('/forgot-password',                forgotPasswordValidator, authController.forgotPassword);
router.post('/reset-password/:token',          resetPasswordValidator,  authController.resetPassword);

export default router;
