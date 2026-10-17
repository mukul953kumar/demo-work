import mongoose from 'mongoose';
import { apiResponse } from '../utils/apiResponse.js';

export function validateObjectId(paramName = 'id') {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse.error(
        res,
        `Invalid identifier format for parameter '${paramName}': ${id}`,
        400
      );
    }
    next();
  };
}

export function validateBody(requiredFields = []) {
  return (req, res, next) => {
    const missing = [];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return apiResponse.error(
        res,
        `Missing required fields: ${missing.join(', ')}`,
        400,
        missing.map((f) => ({ field: f, message: `${f} is required` }))
      );
    }

    next();
  };
}
