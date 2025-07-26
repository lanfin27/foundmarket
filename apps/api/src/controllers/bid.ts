import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@appweb/database'
import { AppError } from '../middleware/error'
import { io } from '../index'

const prisma = new PrismaClient()

export const createBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    const { assetId, amount, message } = req.body

    // Check if asset exists and is active
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    })

    if (!asset || asset.status !== 'ACTIVE') {
      throw new AppError('Asset not available for bidding', 400)
    }

    // Create bid
    const bid = await prisma.bid.create({
      data: {
        assetId,
        bidderId: userId,
        amount: Number(amount),
        message,
        status: 'PENDING',
      },
      include: {
        bidder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Notify asset owner via socket
    io.to(`asset-${assetId}`).emit('new-bid', bid)

    res.status(201).json({
      message: 'Bid submitted successfully',
      bid,
    })
  } catch (error) {
    next(error)
  }
}

export const getBidsByAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assetId } = req.params
    const userId = req.user!.id

    // Check if user is asset owner
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    })

    if (!asset) {
      throw new AppError('Asset not found', 404)
    }

    // Only asset owner can see all bids
    if (asset.sellerId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    const bids = await prisma.bid.findMany({
      where: { assetId },
      include: {
        bidder: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { amount: 'desc' },
    })

    res.json(bids)
  } catch (error) {
    next(error)
  }
}

export const updateBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const userId = req.user!.id
    const { amount, message } = req.body

    // Check ownership
    const bid = await prisma.bid.findUnique({
      where: { id },
    })

    if (!bid) {
      throw new AppError('Bid not found', 404)
    }

    if (bid.bidderId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    if (bid.status !== 'PENDING') {
      throw new AppError('Cannot update bid after it has been processed', 400)
    }

    const updatedBid = await prisma.bid.update({
      where: { id },
      data: {
        amount: amount ? Number(amount) : undefined,
        message,
      },
    })

    res.json({
      message: 'Bid updated successfully',
      bid: updatedBid,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    // Check ownership
    const bid = await prisma.bid.findUnique({
      where: { id },
    })

    if (!bid) {
      throw new AppError('Bid not found', 404)
    }

    if (bid.bidderId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    if (bid.status !== 'PENDING') {
      throw new AppError('Cannot delete bid after it has been processed', 400)
    }

    await prisma.bid.delete({
      where: { id },
    })

    res.json({ message: 'Bid deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const acceptBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    // Get bid with asset
    const bid = await prisma.bid.findUnique({
      where: { id },
      include: { asset: true },
    })

    if (!bid) {
      throw new AppError('Bid not found', 404)
    }

    // Check ownership
    if (bid.asset.sellerId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    // Update bid status
    await prisma.bid.update({
      where: { id },
      data: { status: 'ACCEPTED' },
    })

    // Reject all other bids
    await prisma.bid.updateMany({
      where: {
        assetId: bid.assetId,
        id: { not: id },
        status: 'PENDING',
      },
      data: { status: 'REJECTED' },
    })

    // Update asset status
    await prisma.asset.update({
      where: { id: bid.assetId },
      data: { status: 'SOLD' },
    })

    // Notify bidder
    io.to(`user-${bid.bidderId}`).emit('bid-accepted', bid)

    res.json({ message: 'Bid accepted successfully' })
  } catch (error) {
    next(error)
  }
}

export const rejectBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    // Get bid with asset
    const bid = await prisma.bid.findUnique({
      where: { id },
      include: { asset: true },
    })

    if (!bid) {
      throw new AppError('Bid not found', 404)
    }

    // Check ownership
    if (bid.asset.sellerId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    // Update bid status
    await prisma.bid.update({
      where: { id },
      data: { status: 'REJECTED' },
    })

    // Notify bidder
    io.to(`user-${bid.bidderId}`).emit('bid-rejected', bid)

    res.json({ message: 'Bid rejected' })
  } catch (error) {
    next(error)
  }
}