import { Router } from 'express';
import { getDBStatus } from '../config/db.js';
import { apiResponse } from '../utils/apiResponse.js';

const router = Router();

router.get('/health', (req, res) => {
  const db = getDBStatus();
  const isHealthy = db.connected;

  return apiResponse.success(
    res,
    {
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      service: 'AlumniConnect AI API',
      version: '1.0.0',
      database: db
    },
    isHealthy ? 'Service is operational' : 'Database is connecting or unreachable',
    isHealthy ? 200 : 503
  );
});

export default router;
