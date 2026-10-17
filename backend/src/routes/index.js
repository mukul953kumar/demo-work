import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import alumniRoutes from './alumni.routes.js';
import verificationRoutes from './verification.routes.js';
import mentorshipRoutes from './mentorship.routes.js';
import recommendationsRoutes from './recommendations.routes.js';
import { generalLimiter, authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Apply general rate limiter across all API v1 endpoints
router.use(generalLimiter);

// Health check
router.use(healthRoutes);

// Authentication with rate limiting against brute force
router.use('/auth', authLimiter, authRoutes);

// Alumni Directory & Profiles
router.use('/alumni', alumniRoutes);

// Identity & Employment Verification Workflows
router.use(verificationRoutes);

// Mentorship Requests
router.use('/mentorship-requests', mentorshipRoutes);

// Deterministic Recommendation Engine
router.use('/recommendations', recommendationsRoutes);

export default router;
