import { Router } from 'express';
import {
  createMentorshipRequest,
  getOwnMentorshipRequests,
  getMentorshipRequestById,
  updateMentorshipRequestStatus
} from '../controllers/mentorship.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validateObjectId } from '../middleware/validate.js';

const router = Router();

router.post('/', authenticate, createMentorshipRequest);
router.get('/me', authenticate, getOwnMentorshipRequests);
router.get('/:id', authenticate, validateObjectId('id'), getMentorshipRequestById);
router.patch('/:id', authenticate, validateObjectId('id'), updateMentorshipRequestStatus);

export default router;
