import { AlumniProfile } from '../models/AlumniProfile.js';
import { calculateMatchScore } from '../utils/matchingEngine.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function getMentorRecommendations(req, res, next) {
  try {
    const {
      requestType,
      skills,
      industry,
      goal,
      limit = 5
    } = req.query;

    const parsedSkills = skills
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const criteria = {
      requestType,
      skills: parsedSkills,
      industry,
      goal
    };

    // Find active discoverable alumni profiles
    const profiles = await AlumniProfile.find({
      availability: { $ne: 'paused' }
    });

    const recommendations = profiles.map((profile) => {
      const match = calculateMatchScore(profile, criteria);
      return {
        ...profile.toPublicJSON(),
        matchScore: match.score,
        matchReasons: match.reasons
      };
    });

    // Sort descending by calculated match score
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    const maxResults = Math.min(parseInt(limit, 10) || 5, 20);
    const topResults = recommendations.slice(0, maxResults);

    return apiResponse.success(
      res,
      topResults,
      'Mentor recommendations generated successfully',
      200,
      {
        count: topResults.length,
        criteriaUsed: {
          requestType: requestType || null,
          skills: parsedSkills,
          industry: industry || null,
          goal: goal || null
        }
      }
    );
  } catch (error) {
    next(error);
  }
}
