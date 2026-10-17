import { VerificationRequest } from '../models/VerificationRequest.js';
import { AlumniProfile } from '../models/AlumniProfile.js';
import { apiResponse } from '../utils/apiResponse.js';

// ==========================================
// Alumni Endpoints
// ==========================================

export async function submitVerificationRequest(req, res, next) {
  try {
    const user = req.user;
    const profile = await AlumniProfile.findOne({ userId: user._id });

    if (!profile) {
      return apiResponse.error(res, 'Alumni profile not found. Please complete profile creation first.', 404);
    }

    // Check if an existing pending request is already under audit
    const existingPending = await VerificationRequest.findOne({
      alumniProfileId: profile._id,
      status: 'pending'
    });

    if (existingPending) {
      return apiResponse.error(
        res,
        'You already have an active verification request pending administrator review.',
        409
      );
    }

    const {
      type = 'college_identity',
      verificationMethod = 'college_record_match',
      evidenceRefs = []
    } = req.body;

    if (!['college_identity', 'employment'].includes(type)) {
      return apiResponse.error(res, 'Verification type must be college_identity or employment', 400);
    }

    // Create verification request
    const request = await VerificationRequest.create({
      alumniProfileId: profile._id,
      userId: user._id,
      type,
      verificationMethod,
      evidenceRefs,
      status: 'pending',
      submittedAt: new Date()
    });

    // Update profile status to pending
    if (type === 'college_identity') {
      profile.collegeVerificationStatus = 'pending';
    } else {
      profile.employmentVerificationStatus = 'pending';
    }
    await profile.save();

    return apiResponse.success(
      res,
      request,
      'Verification request submitted for administrator audit',
      201
    );
  } catch (error) {
    next(error);
  }
}

export async function getOwnVerifications(req, res, next) {
  try {
    const user = req.user;
    const requests = await VerificationRequest.find({ userId: user._id })
      .sort({ submittedAt: -1 })
      .populate('reviewedBy', 'name email');

    return apiResponse.success(
      res,
      requests,
      'Verification history retrieved successfully',
      200
    );
  } catch (error) {
    next(error);
  }
}

// ==========================================
// Administrator Endpoints
// ==========================================

export async function getAdminVerificationQueue(req, res, next) {
  try {
    const { status } = req.query;
    const { page, limit, skip } = req.pagination;
    const filter = {};

    if (status && ['pending', 'verified', 'rejected', 'needs_more_info'].includes(status)) {
      filter.status = status;
    }

    const total = await VerificationRequest.countDocuments(filter);
    const queue = await VerificationRequest.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email role')
      .populate('alumniProfileId', 'department graduationYear currentRole employer avatarUrl')
      .populate('reviewedBy', 'name email');

    return apiResponse.success(
      res,
      queue,
      'Verification queue retrieved successfully',
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

export async function getAdminVerificationById(req, res, next) {
  try {
    const { id } = req.params;
    const request = await VerificationRequest.findById(id)
      .populate('userId', 'name email role')
      .populate('alumniProfileId')
      .populate('reviewedBy', 'name email');

    if (!request) {
      return apiResponse.error(res, 'Verification record not found', 404);
    }

    return apiResponse.success(
      res,
      request,
      'Verification submission details retrieved',
      200
    );
  } catch (error) {
    next(error);
  }
}

export async function reviewVerificationRequest(req, res, next) {
  try {
    const { id } = req.params;
    const { status, reviewNote = '', verificationMethod } = req.body;

    if (!['verified', 'rejected', 'needs_more_info'].includes(status)) {
      return apiResponse.error(
        res,
        "Status decision must be one of: 'verified', 'rejected', or 'needs_more_info'",
        400
      );
    }

    if (['rejected', 'needs_more_info'].includes(status) && (!reviewNote || reviewNote.trim() === '')) {
      return apiResponse.error(
        res,
        'A descriptive reviewNote is required when rejecting or requesting more information',
        400
      );
    }

    const request = await VerificationRequest.findById(id);
    if (!request) {
      return apiResponse.error(res, 'Verification request not found', 404);
    }

    const adminUser = req.user;
    request.status = status;
    request.reviewedBy = adminUser._id;
    request.reviewedAt = new Date();
    request.reviewNote = reviewNote.trim();

    if (verificationMethod) {
      request.verificationMethod = verificationMethod;
    }

    await request.save();

    // Synchronize decision onto AlumniProfile
    const profile = await AlumniProfile.findById(request.alumniProfileId);
    if (profile) {
      if (request.type === 'college_identity') {
        profile.collegeVerificationStatus = status;
        // Non-negotiable rule: College identity verification does NOT automatically verify employment
      } else if (request.type === 'employment') {
        profile.employmentVerificationStatus = status;
      }
      await profile.save();
    }

    return apiResponse.success(
      res,
      {
        request,
        updatedProfileStatus: {
          collegeVerificationStatus: profile?.collegeVerificationStatus,
          employmentVerificationStatus: profile?.employmentVerificationStatus
        }
      },
      `Verification request successfully set to '${status}'`,
      200
    );
  } catch (error) {
    next(error);
  }
}
