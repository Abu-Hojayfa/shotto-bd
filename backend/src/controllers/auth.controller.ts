import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { extractErrors } from '../utils/validation';
import { sendPasswordResetEmail } from '../utils/email';
import { AuthenticatedRequest, UserRole } from '../types';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── Signup ────────────────────────────────────────────────────────────────────
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = extractErrors(req);
    if (errors) { sendError(res, 422, 'Validation failed', errors); return; }

    const { fullName, email, password, role = 'citizen' as UserRole, phone, organization, nationalId } = req.body;

    if (role === 'admin') {
      sendError(res, 403, 'Admin accounts cannot be self-registered.');
      return;
    }

    const exists = await User.findOne({ email });
    if (exists) { sendError(res, 409, 'An account with this email already exists.'); return; }

    const user = await User.create({ fullName, email, password, role, phone, organization, nationalId });

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    sendSuccess(res, 201, 'Account created successfully.', {
      accessToken,
      user: {
        id:           user._id,
        fullName:     user.fullName,
        email:        user.email,
        role:         user.role,
        isVerified:   user.isVerified,
        isApproved:   user.isApproved,
        organization: user.organization,
        createdAt:    user.createdAt,
      },
    });
  } catch (err) { next(err); }
};

// ── Login ─────────────────────────────────────────────────────────────────────
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = extractErrors(req);
    if (errors) { sendError(res, 422, 'Validation failed', errors); return; }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    const INVALID = 'Invalid email or password.';

    if (!user)          { sendError(res, 401, INVALID); return; }
    if (!user.isActive) { sendError(res, 403, 'Your account has been deactivated. Contact support.'); return; }

    const match = await user.comparePassword(password);
    if (!match) { sendError(res, 401, INVALID); return; }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    sendSuccess(res, 200, 'Login successful.', {
      accessToken,
      user: {
        id:           user._id,
        fullName:     user.fullName,
        email:        user.email,
        role:         user.role,
        isVerified:   user.isVerified,
        isApproved:   user.isApproved,
        organization: user.organization,
        lastLogin:    user.lastLogin,
      },
    });
  } catch (err) { next(err); }
};

// ── Logout ────────────────────────────────────────────────────────────────────
export const logout = (_req: Request, res: Response): void => {
  clearRefreshTokenCookie(res);
  sendSuccess(res, 200, 'Logged out successfully.');
};

// ── Refresh token ─────────────────────────────────────────────────────────────
export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) { sendError(res, 401, 'Refresh token not found. Please log in again.'); return; }

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      clearRefreshTokenCookie(res);
      sendError(res, 401, 'Refresh token expired or invalid. Please log in again.');
      return;
    }

    const user = await User.findById(decoded.userId).select('_id email role isActive');
    if (!user || !user.isActive) {
      clearRefreshTokenCookie(res);
      sendError(res, 401, 'User not found or deactivated.');
      return;
    }

    const newAccess  = generateAccessToken(user);
    const newRefresh = generateRefreshToken(user);
    setRefreshTokenCookie(res, newRefresh);

    sendSuccess(res, 200, 'Token refreshed.', { accessToken: newAccess });
  } catch (err) { next(err); }
};

// ── Me ────────────────────────────────────────────────────────────────────────
export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req as AuthenticatedRequest).user.userId).select('-password');
    if (!user) { sendError(res, 404, 'User not found.'); return; }
    sendSuccess(res, 200, 'Profile fetched.', { user });
  } catch (err) { next(err); }
};

// ── Google OAuth ──────────────────────────────────────────────────────────────
export const googleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = extractErrors(req);
    if (errors) { sendError(res, 422, 'Validation failed', errors); return; }

    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      sendError(res, 400, 'Invalid Google ID token payload');
      return;
    }

    const { email, name, sub: googleId, picture } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        if (picture && !user.profileImage) user.profileImage = picture;
        await user.save({ validateBeforeSave: false });
      }
    } else {
      user = await User.create({
        fullName: name || 'Google User',
        email,
        googleId,
        role: 'citizen',
        isVerified: true,
        isApproved: true,
        profileImage: picture,
      });
    }

    if (!user.isActive) {
      sendError(res, 403, 'Your account has been deactivated. Contact support.');
      return;
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    sendSuccess(res, 200, 'Login successful.', {
      accessToken,
      user: {
        id:           user._id,
        fullName:     user.fullName,
        email:        user.email,
        role:         user.role,
        isVerified:   user.isVerified,
        isApproved:   user.isApproved,
        organization: user.organization,
        lastLogin:    user.lastLogin,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── Forgot Password ───────────────────────────────────────────────────────────
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = extractErrors(req);
    if (errors) { sendError(res, 422, 'Validation failed', errors); return; }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Return 200 to prevent user enumeration
      sendSuccess(res, 200, 'If an account exists with that email, a password reset link has been sent.');
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and save to DB
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save({ validateBeforeSave: false });

    // Send email
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    try {
      await sendPasswordResetEmail(user.email, resetUrl);
      sendSuccess(res, 200, 'Password reset link sent to your email.');
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      sendError(res, 500, 'Error sending the email. Please try again later.');
    }
  } catch (err) {
    next(err);
  }
};

// ── Reset Password ────────────────────────────────────────────────────────────
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = extractErrors(req);
    if (errors) { sendError(res, 422, 'Validation failed', errors); return; }

    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      sendError(res, 400, 'Password reset token is invalid or has expired.');
      return;
    }

    // Update password
    user.password = req.body.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    sendSuccess(res, 200, 'Password reset successful. You can now log in.');
  } catch (err) {
    next(err);
  }
};
