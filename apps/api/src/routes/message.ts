import { Router } from 'express'
import { body, query } from 'express-validator'
import {
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage,
} from '../controllers/message'
import { authenticate } from '../middleware/auth'
import { validateRequest } from '../middleware/validation'

const router = Router()

// All routes require authentication
router.use(authenticate)

// Get user's conversations
router.get(
  '/conversations',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 50 }),
  ],
  validateRequest,
  getConversations
)

// Get messages in a conversation
router.get(
  '/conversation/:userId',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  validateRequest,
  getMessages
)

// Send a message
router.post(
  '/',
  [
    body('recipientId').notEmpty(),
    body('content').notEmpty().trim(),
    body('assetId').optional(),
  ],
  validateRequest,
  sendMessage
)

// Mark messages as read
router.put('/read/:userId', markAsRead)

// Delete a message
router.delete('/:id', deleteMessage)

export default router