import { Router } from 'express';
import { getAlumniList, getAlumniById, updateOwnProfile } from '../controllers/alumni.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { pagination } from '../middleware/pagination.js';
import { validateObjectId } from '../middleware/validate.js';

const router = Router();

// Public discovery endpoints
router.get('/', pagination(10, 50), getAlumniList);
router.get('/:id', validateObjectId('id'), getAlumniById);

// Authenticated alumni endpoints
router.patch('/me', authenticate, authorize('alumni'), updateOwnProfile);

export default router;
