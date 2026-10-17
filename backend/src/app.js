import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  env.CLIENT_ORIGIN || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS origin denied'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parsing with strict size limits
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'AlumniConnect AI Backend API',
    version: '1.0.0',
    documentation: '/api/v1/health',
    status: 'online'
  });
});

// Mount versioned API routes
app.use('/api/v1', apiRoutes);

// Catch 404 for undefined routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

export default app;
