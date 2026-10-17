import { AlumniProfile } from '../models/AlumniProfile.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function getAlumniList(req, res, next) {
  try {
    const {
      search,
      department,
      graduationYear,
      industry,
      availability,
      collegeVerificationStatus,
      mentorshipTopic,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const { page, limit, skip } = req.pagination;
    const filter = {};

    // 1. Full-text or Regex Search
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { currentRole: searchRegex },
        { employer: searchRegex },
        { industry: searchRegex },
        { skills: searchRegex },
        { bio: searchRegex },
        { mentorshipTopics: searchRegex }
      ];
    }

    // 2. Specific Allowlisted Filters
    if (department && department.trim() !== '') {
      filter.department = new RegExp(`^${department.trim()}$`, 'i');
    }

    if (graduationYear) {
      const year = parseInt(graduationYear, 10);
      if (!isNaN(year)) {
        filter.graduationYear = year;
      }
    }

    if (industry && industry.trim() !== '') {
      filter.industry = new RegExp(industry.trim(), 'i');
    }

    if (availability && ['available', 'busy', 'paused'].includes(availability)) {
      filter.availability = availability;
    }

    if (
      collegeVerificationStatus &&
      ['unverified', 'pending', 'verified', 'rejected', 'needs_more_info'].includes(collegeVerificationStatus)
    ) {
      filter.collegeVerificationStatus = collegeVerificationStatus;
    }

    if (mentorshipTopic && mentorshipTopic.trim() !== '') {
      filter.mentorshipTopics = mentorshipTopic.trim();
    }

    // 3. Sorting options
    const allowedSortFields = ['createdAt', 'graduationYear', 'name'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDirection = sortOrder.toLowerCase() === 'asc' ? 1 : -1;
    const sortObj = { [sortField]: sortDirection };

    // 4. Query execution
    const total = await AlumniProfile.countDocuments(filter);
    const profiles = await AlumniProfile.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const publicProfiles = profiles.map((p) => p.toPublicJSON());

    return apiResponse.success(
      res,
      publicProfiles,
      'Alumni directory retrieved successfully',
      200,
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function getAlumniById(req, res, next) {
  try {
    const { id } = req.params;
    const profile = await AlumniProfile.findById(id);

    if (!profile) {
      return apiResponse.error(res, 'Alumni profile not found', 404);
    }

    return apiResponse.success(
      res,
      profile.toPublicJSON(),
      'Alumni profile retrieved successfully',
      200
    );
  } catch (error) {
    next(error);
  }
}

export async function updateOwnProfile(req, res, next) {
  try {
    const user = req.user;
    if (user.role !== 'alumni') {
      return apiResponse.error(res, 'Only alumni accounts can update an alumni profile', 403);
    }

    const profile = await AlumniProfile.findOne({ userId: user._id });
    if (!profile) {
      return apiResponse.error(res, 'Alumni profile not found for current user', 404);
    }

    // Allowlisted updatable fields (Security: Prevent self-verification tampering)
    const allowedFields = [
      'avatarUrl',
      'currentRole',
      'employer',
      'industry',
      'bio',
      'skills',
      'mentorshipTopics',
      'availability',
      'publicLinks'
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    }

    await profile.save();

    return apiResponse.success(
      res,
      profile.toPublicJSON(),
      'Profile updated successfully',
      200
    );
  } catch (error) {
    next(error);
  }
}
