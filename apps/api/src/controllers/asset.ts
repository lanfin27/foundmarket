import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@appweb/database'
import { AppError } from '../middleware/error'
import { io } from '../index'

const prisma = new PrismaClient()

export const getAssets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      minPrice,
      maxPrice,
      sort = 'newest',
    } = req.query

    const skip = (Number(page) - 1) * Number(limit)

    // Build where clause
    const where: any = {
      status: 'ACTIVE',
    }

    if (category) {
      where.category = category
    }

    if (minPrice || maxPrice) {
      where.askingPrice = {}
      if (minPrice) where.askingPrice.gte = Number(minPrice)
      if (maxPrice) where.askingPrice.lte = Number(maxPrice)
    }

    // Build order by
    let orderBy: any = {}
    switch (sort) {
      case 'price-asc':
        orderBy = { askingPrice: 'asc' }
        break
      case 'price-desc':
        orderBy = { askingPrice: 'desc' }
        break
      case 'views':
        orderBy = { viewCount: 'desc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    // Get assets
    const [assets, total] = await Promise.all([
      prisma.asset.findMany({
        where,
        orderBy,
        skip,
        take: Number(limit),
        include: {
          financials: true,
          _count: {
            select: { bids: true },
          },
        },
      }),
      prisma.asset.count({ where }),
    ])

    res.json({
      assets,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getAssetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        financials: true,
        documents: {
          where: { isPublic: true },
        },
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
          },
        },
        _count: {
          select: { bids: true },
        },
      },
    })

    if (!asset) {
      throw new AppError('Asset not found', 404)
    }

    // Increment view count
    await prisma.asset.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    })

    res.json(asset)
  } catch (error) {
    next(error)
  }
}

export const createAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id
    const {
      type,
      category,
      title,
      summary,
      description,
      askingPrice,
      region,
      industry,
      financials,
    } = req.body

    const asset = await prisma.asset.create({
      data: {
        sellerId: userId,
        type,
        category,
        title,
        summary,
        description,
        askingPrice: Number(askingPrice),
        region,
        industry,
        status: 'PENDING', // Pending review
        financials: financials ? {
          create: {
            monthlyRevenue: Number(financials.monthlyRevenue),
            monthlyProfit: Number(financials.monthlyProfit),
            yearlyRevenue: Number(financials.yearlyRevenue),
            yearlyProfit: Number(financials.yearlyProfit),
            growthRate: Number(financials.growthRate),
          },
        } : undefined,
      },
      include: {
        financials: true,
      },
    })

    res.status(201).json({
      message: 'Asset created successfully',
      asset,
    })
  } catch (error) {
    next(error)
  }
}

export const updateAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    // Check ownership
    const existingAsset = await prisma.asset.findUnique({
      where: { id },
    })

    if (!existingAsset) {
      throw new AppError('Asset not found', 404)
    }

    if (existingAsset.sellerId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    const asset = await prisma.asset.update({
      where: { id },
      data: {
        ...req.body,
        askingPrice: req.body.askingPrice ? Number(req.body.askingPrice) : undefined,
      },
    })

    // Notify real-time subscribers
    io.to(`asset-${id}`).emit('asset-updated', asset)

    res.json({
      message: 'Asset updated successfully',
      asset,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    // Check ownership
    const asset = await prisma.asset.findUnique({
      where: { id },
    })

    if (!asset) {
      throw new AppError('Asset not found', 404)
    }

    if (asset.sellerId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    // Soft delete
    await prisma.asset.update({
      where: { id },
      data: { status: 'INACTIVE' },
    })

    res.json({ message: 'Asset deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const uploadDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const userId = req.user!.id
    const files = req.files as Express.Multer.File[]

    // Check ownership
    const asset = await prisma.asset.findUnique({
      where: { id },
    })

    if (!asset) {
      throw new AppError('Asset not found', 404)
    }

    if (asset.sellerId !== userId) {
      throw new AppError('Unauthorized', 403)
    }

    // Create document records
    const documents = await Promise.all(
      files.map(file =>
        prisma.document.create({
          data: {
            assetId: id,
            title: file.originalname,
            url: `/uploads/${file.filename}`,
            type: file.mimetype.includes('image') ? 'IMAGE' : 'DOCUMENT',
            isPublic: false,
          },
        })
      )
    )

    res.json({
      message: 'Documents uploaded successfully',
      documents,
    })
  } catch (error) {
    next(error)
  }
}

export const getAssetStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const [viewsToday, totalBids, averageBid] = await Promise.all([
      // In production, you'd track daily views properly
      prisma.asset.findUnique({
        where: { id },
        select: { viewCount: true },
      }),
      prisma.bid.count({
        where: { assetId: id },
      }),
      prisma.bid.aggregate({
        where: { assetId: id },
        _avg: { amount: true },
      }),
    ])

    res.json({
      viewsToday: viewsToday?.viewCount || 0,
      totalBids,
      averageBid: averageBid._avg.amount || 0,
    })
  } catch (error) {
    next(error)
  }
}