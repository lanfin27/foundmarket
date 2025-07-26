import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@appweb/database'
import { AppError } from '../middleware/error'
import { io } from '../index'

const prisma = new PrismaClient()

export const getConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    const { page = 1, limit = 20 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    // Get unique conversations
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'desc' },
      distinct: ['senderId', 'receiverId'],
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Group by conversation
    const conversations = messages.reduce((acc: any[], message) => {
      const otherUser = message.senderId === userId ? message.receiver : message.sender
      const existing = acc.find(c => c.user.id === otherUser.id)
      
      if (!existing) {
        acc.push({
          user: otherUser,
          lastMessage: message,
          unread: message.receiverId === userId && !message.isRead,
        })
      }
      
      return acc
    }, [])

    res.json({
      conversations: conversations.slice(skip, skip + Number(limit)),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: conversations.length,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = req.user!.id
    const { userId } = req.params
    const { page = 1, limit = 50 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: userId },
          { senderId: userId, receiverId: currentUserId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      skip,
      take: Number(limit),
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: userId,
        receiverId: currentUserId,
        isRead: false,
      },
      data: { isRead: true },
    })

    res.json(messages)
  } catch (error) {
    next(error)
  }
}

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const senderId = req.user!.id
    const { recipientId, content, assetId } = req.body

    // Check if recipient exists
    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    })

    if (!recipient) {
      throw new AppError('Recipient not found', 404)
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId: recipientId,
        content,
        assetId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Send real-time notification
    io.to(`user-${recipientId}`).emit('new-message', message)

    res.status(201).json(message)
  } catch (error) {
    next(error)
  }
}

export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = req.user!.id
    const { userId } = req.params

    await prisma.message.updateMany({
      where: {
        senderId: userId,
        receiverId: currentUserId,
        isRead: false,
      },
      data: { isRead: true },
    })

    res.json({ message: 'Messages marked as read' })
  } catch (error) {
    next(error)
  }
}

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    const { id } = req.params

    const message = await prisma.message.findUnique({
      where: { id },
    })

    if (!message) {
      throw new AppError('Message not found', 404)
    }

    if (message.senderId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    await prisma.message.delete({
      where: { id },
    })

    res.json({ message: 'Message deleted' })
  } catch (error) {
    next(error)
  }
}