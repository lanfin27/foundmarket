import { Router } from 'express'
import { body, query } from 'express-validator'
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  uploadDocuments,
  getAssetStats,
} from '../controllers/asset'
import { authenticate } from '../middleware/auth'
import { validateRequest } from '../middleware/validation'
import { upload } from '../middleware/upload'

const router = Router()

// Get all assets (public)
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('category').optional().isString(),
    query('minPrice').optional().isNumeric(),
    query('maxPrice').optional().isNumeric(),
    query('sort').optional().isIn(['newest', 'price-asc', 'price-desc', 'views']),
  ],
  validateRequest,
  getAssets
)

// Get asset by ID (public)
router.get('/:id', getAssetById)

// Get asset statistics
router.get('/:id/stats', getAssetStats)

// Create asset (authenticated)
router.post(
  '/',
  authenticate,
  [
    body('type').isIn(['WEBSITE', 'APP', 'SAAS', 'ECOMMERCE', 'CONTENT', 'OTHER']),
    body('category').notEmpty().trim(),
    body('title').notEmpty().trim(),
    body('summary').notEmpty().trim(),
    body('description').notEmpty(),
    body('askingPrice').isNumeric({ no_symbols: true }),
    body('region').notEmpty().trim(),
    body('industry').notEmpty().trim(),
  ],
  validateRequest,
  createAsset
)

// Update asset (authenticated, owner only)
router.put(
  '/:id',
  authenticate,
  [
    body('title').optional().trim(),
    body('summary').optional().trim(),
    body('description').optional(),
    body('askingPrice').optional().isNumeric({ no_symbols: true }),
    body('status').optional().isIn(['ACTIVE', 'PENDING', 'SOLD', 'INACTIVE']),
  ],
  validateRequest,
  updateAsset
)

// Delete asset (authenticated, owner only)
router.delete('/:id', authenticate, deleteAsset)

// Upload documents (authenticated, owner only)
router.post(
  '/:id/documents',
  authenticate,
  upload.array('documents', 10),
  uploadDocuments
)

export default router