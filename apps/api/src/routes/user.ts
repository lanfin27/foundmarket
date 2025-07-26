import { Router } from 'express'
import { body } from 'express-validator'
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getUserAssets,
  getUserBids,
} from '../controllers/user'
import { authenticate } from '../middleware/auth'
import { validateRequest } from '../middleware/validation'
import { upload } from '../middleware/upload'

const router = Router()

// All routes require authentication
router.use(authenticate)

// Get current user profile
router.get('/profile', getProfile)

// Update profile
router.put(
  '/profile',
  upload.single('avatar'),
  [
    body('name').optional().trim(),
    body('company').optional().trim(),
    body('phone').optional().isMobilePhone('ko-KR'),
    body('bio').optional().trim(),
  ],
  validateRequest,
  updateProfile
)

// Change password
router.put(
  '/password',
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 8 }).trim(),
  ],
  validateRequest,
  changePassword
)

// Get user's assets
router.get('/assets', getUserAssets)

// Get user's bids
router.get('/bids', getUserBids)

// Delete account
router.delete('/account', deleteAccount)

export default router