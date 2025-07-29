import mongoose from 'mongoose'

interface ConnectionState {
  isConnected?: number
}

const connection: ConnectionState = {}

export async function connectToDatabase(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to database')
    return
  }

  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URI_PROD
    
    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined in environment variables')
    }

    const db = await mongoose.connect(mongoUri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    connection.isConnected = db.connections[0].readyState
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error('Database connection error:', error)
    throw new Error('Failed to connect to database')
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (connection.isConnected) {
    await mongoose.disconnect()
    connection.isConnected = 0
    console.log('Disconnected from MongoDB')
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectFromDatabase()
  process.exit(0)
})