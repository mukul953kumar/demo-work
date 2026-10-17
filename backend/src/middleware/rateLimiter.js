import rateLimit from 'express-rate-limit';
import { apiResponse } from '../utils/apiResponse.js';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return apiResponse.error(
      res,
      'Too many requests from this IP address. Please try again after 15 minutes.',
      429
    );
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return apiResponse.error(
      res,
      'Too many authentication attempts. Please try again after 15 minutes.',
      429
    );
  }
});

export const requestCreationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return apiResponse.error(
      res,
      'Too many requests created. Please wait before submitting additional requests.',
      429
    );
  }
});
