import { Router } from 'express'
import { body } from 'express-validator'
import {
  createBid,
  getBidsByAsset,
  updateBid,
  deleteBid,
  acceptBid,
  rejectBid,
} from '../controllers/bid'
import { authenticate } from '../middleware/auth'
import { validateRequest } from '../middleware/validation'

const router = Router()

// Get bids for an asset (public for asset owner, private for others)
router.get('/asset/:assetId', authenticate, getBidsByAsset)

// Create a bid (authenticated)
router.post(
  '/',
  authenticate,
  [
    body('assetId').notEmpty(),
    body('amount').isNumeric({ no_symbols: true }),
    body('message').optional().trim(),
  ],
  validateRequest,
  createBid
)

// Update bid (authenticated, bidder only)
router.put(
  '/:id',
  authenticate,
  [
    body('amount').optional().isNumeric({ no_symbols: true }),
    body('message').optional().trim(),
  ],
  validateRequest,
  updateBid
)

// Delete bid (authenticated, bidder only)
router.delete('/:id', authenticate, deleteBid)

// Accept bid (authenticated, asset owner only)
router.post('/:id/accept', authenticate, acceptBid)

// Reject bid (authenticated, asset owner only)
router.post('/:id/reject', authenticate, rejectBid)

export default router