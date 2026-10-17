import { Router } from 'express';
import {
  submitVerificationRequest,
  getOwnVerifications,
  getAdminVerificationQueue,
  getAdminVerificationById,
  reviewVerificationRequest
} from '../controllers/verification.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { pagination } from '../middleware/pagination.js';
import { validateObjectId } from '../middleware/validate.js';

const router = Router();

// Alumni verification endpoints
router.post('/alumni/verification', authenticate, authorize('alumni'), submitVerificationRequest);
router.get('/alumni/me/verification', authenticate, authorize('alumni'), getOwnVerifications);

// Registrar Administrator audit queue endpoints
router.get('/admin/verifications', authenticate, authorize('admin'), pagination(10, 50), getAdminVerificationQueue);
router.get('/admin/verifications/:id', authenticate, authorize('admin'), validateObjectId('id'), getAdminVerificationById);
router.patch('/admin/verifications/:id', authenticate, authorize('admin'), validateObjectId('id'), reviewVerificationRequest);

export default router;
