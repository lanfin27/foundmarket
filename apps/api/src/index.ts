import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'

// Import routes
import authRouter from './routes/auth'
import assetRouter from './routes/asset'
import userRouter from './routes/user'
import bidRouter from './routes/bid'
import messageRouter from './routes/message'

// Import middleware
import { errorHandler } from './middleware/error'
import { rateLimiter } from './middleware/rateLimiter'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  },
})

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimiter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/assets', assetRouter)
app.use('/api/users', userRouter)
app.use('/api/bids', bidRouter)
app.use('/api/messages', messageRouter)

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id)

  socket.on('join-asset', (assetId: string) => {
    socket.join(`asset-${assetId}`)
  })

  socket.on('leave-asset', (assetId: string) => {
    socket.leave(`asset-${assetId}`)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Error handling
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})

// Export for testing
export { app, io }