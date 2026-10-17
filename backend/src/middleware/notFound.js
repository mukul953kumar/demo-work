import { apiResponse } from '../utils/apiResponse.js';

export function notFound(req, res) {
  return apiResponse.error(
    res,
    `Route not found: ${req.method} ${req.originalUrl}`,
    404
  );
}
