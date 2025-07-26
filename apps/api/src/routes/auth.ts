import { Router } from 'express'
import { body } from 'express-validator'
import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from '../controllers/auth'
import { validateRequest } from '../middleware/validation'
import { authenticate } from '../middleware/auth'

const router = Router()

// Register
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).trim(),
    body('name').notEmpty().trim(),
  ],
  validateRequest,
  register
)

// Login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validateRequest,
  login
)

// Logout
router.post('/logout', authenticate, logout)

// Refresh token
router.post('/refresh', refreshToken)

// Forgot password
router.post(
  '/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  validateRequest,
  forgotPassword
)

// Reset password
router.post(
  '/reset-password',
  [
    body('token').notEmpty(),
    body('password').isLength({ min: 8 }).trim(),
  ],
  validateRequest,
  resetPassword
)

// Verify email
router.get('/verify-email/:token', verifyEmail)

export default router