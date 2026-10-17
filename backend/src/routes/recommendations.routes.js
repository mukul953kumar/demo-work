import { Router } from 'express';
import { getMentorRecommendations } from '../controllers/recommendations.controller.js';

const router = Router();

router.get('/mentors', getMentorRecommendations);

export default router;
