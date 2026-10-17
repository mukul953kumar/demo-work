import app from './app.js';
import { env, validateEnv } from './config/env.js';
import { connectDB } from './config/db.js';

async function startServer() {
  try {
    validateEnv();
    await connectDB();

    const server = app.listen(env.PORT, () => {
      console.log(`[SERVER] AlumniConnect AI backend running on http://localhost:${env.PORT}`);
      console.log(`[SERVER] Health endpoint: http://localhost:${env.PORT}/api/v1/health`);
      console.log(`[SERVER] Environment: ${env.NODE_ENV}`);
    });

    const gracefulShutdown = async (signal) => {
      console.log(`\n[SERVER] ${signal} signal received: closing HTTP server...`);
      server.close(() => {
        console.log('[SERVER] HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('[FATAL] Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
