import { body } from 'express-validator';

export const signupValidator = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
     .notEmpty().withMessage('Password is required')
     .isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),

  body('role')
    .optional()
    .isIn(['citizen', 'official', 'journalist', 'auditor'])
    .withMessage('Role must be one of: citizen, official, journalist, auditor'),

  body('phone')
    .optional({ values: 'falsy' }).trim()
    .matches(/^[+]?[\d\s\-()]{7,20}$/).withMessage('Please provide a valid phone number'),

  body('organization')
    .optional({ values: 'falsy' }).trim()
    .isLength({ max: 200 }).withMessage('Organization cannot exceed 200 characters'),

  body('nationalId')
    .optional({ values: 'falsy' }).trim()
    .notEmpty().withMessage('National ID cannot be blank if provided'),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

export const googleAuthValidator = [
  body('idToken')
    .notEmpty().withMessage('Google ID token is required'),
];

export const forgotPasswordValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
];

export const resetPasswordValidator = [
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),

  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your new password')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error('Passwords do not match');
      return true;
    }),
];
