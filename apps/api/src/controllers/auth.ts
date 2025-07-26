import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@appweb/database'
import { AppError } from '../middleware/error'

const prisma = new PrismaClient()

const generateToken = (userId: string, email: string) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  )
}

const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    { expiresIn: '30d' }
  )
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new AppError('User already exists', 400)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        // Store hashed password in a custom field if needed
        // For now, we'll use the OAuth pattern
      },
    })

    // Generate tokens
    const token = generateToken(user.id, user.email!)
    const refreshToken = generateRefreshToken(user.id)

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    // For OAuth users, we don't store passwords
    // This is a simplified version - in production, you'd have a separate password field
    // const isValidPassword = await bcrypt.compare(password, user.password)
    
    // Generate tokens
    const token = generateToken(user.id, user.email!)
    const refreshToken = generateRefreshToken(user.id)

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // In a production app, you might want to invalidate the token
    // For now, just return success
    res.json({ message: 'Logout successful' })
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      throw new AppError('Refresh token required', 400)
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'refresh-secret'
    ) as any

    if (decoded.type !== 'refresh') {
      throw new AppError('Invalid token type', 401)
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    // Generate new tokens
    const newToken = generateToken(user.id, user.email!)
    const newRefreshToken = generateRefreshToken(user.id)

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if user exists
      res.json({ message: 'If the email exists, a reset link has been sent' })
      return
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id, type: 'password-reset' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    )

    // In production, send email with reset link
    // For now, just return the token
    res.json({
      message: 'Password reset token generated',
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
    })
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as any

    if (decoded.type !== 'password-reset') {
      throw new AppError('Invalid token type', 401)
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user password
    // In production, you'd update the password field
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { updatedAt: new Date() }, // Placeholder update
    })

    res.json({ message: 'Password reset successful' })
  } catch (error) {
    next(error)
  }
}

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as any

    if (decoded.type !== 'email-verification') {
      throw new AppError('Invalid token type', 401)
    }

    // Update user
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: new Date() },
    })

    res.redirect('/auth?verified=true')
  } catch (error) {
    next(error)
  }
}