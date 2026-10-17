import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return apiResponse.error(res, 'Authorization token required in format: Bearer <token>', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.status !== 'active') {
      return apiResponse.error(res, 'User account not found or deactivated', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return apiResponse.error(res, 'Invalid or expired authentication token', 401);
    }
    next(error);
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return apiResponse.error(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return apiResponse.error(
        res,
        `Forbidden: Role '${req.user.role}' does not have permission to access this resource`,
        403
      );
    }

    next();
  };
}
