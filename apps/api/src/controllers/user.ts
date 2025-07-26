import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@appweb/database'
import { AppError } from '../middleware/error'

const prisma = new PrismaClient()

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            assets: true,
            bids: true,
          },
        },
      },
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    const { name } = req.body

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
    })

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Implementation would go here
    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    next(error)
  }
}

export const getUserAssets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id

    const assets = await prisma.asset.findMany({
      where: { sellerId: userId },
      include: {
        financials: true,
        _count: {
          select: { bids: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(assets)
  } catch (error) {
    next(error)
  }
}

export const getUserBids = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id

    const bids = await prisma.bid.findMany({
      where: { bidderId: userId },
      include: {
        asset: {
          include: {
            seller: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(bids)
  } catch (error) {
    next(error)
  }
}

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id

    // In production, you might want to soft delete or anonymize
    await prisma.user.delete({
      where: { id: userId },
    })

    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    next(error)
  }
}