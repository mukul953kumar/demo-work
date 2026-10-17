import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: true
    });

    isConnected = true;
    console.log(`[DB] Connected to MongoDB: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('[DB] Connection error:', err.message);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[DB] MongoDB disconnected');
      isConnected = false;
    });

    return conn;
  } catch (error) {
    console.error(`[DB] Connection failed: ${error.message}`);
    isConnected = false;
    throw error;
  }
}

export function getDBStatus() {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return {
    status: states[state] || 'unknown',
    connected: state === 1,
    databaseName: mongoose.connection.name || null
  };
}
