import mongoose from 'mongoose';
import { MentorshipRequest } from '../models/MentorshipRequest.js';
import { AlumniProfile } from '../models/AlumniProfile.js';
import { User } from '../models/User.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createMentorshipRequest(req, res, next) {
  try {
    const studentUser = req.user;
    if (studentUser.role !== 'student') {
      return apiResponse.error(res, 'Only students can submit mentorship requests', 403);
    }

    const {
      alumniId,
      alumniProfileId,
      requestType,
      message,
      studentGoal,
      proposedSlots = []
    } = req.body;

    if (!requestType || !message || !studentGoal) {
      return apiResponse.error(
        res,
        'requestType, message, and studentGoal are required fields',
        400
      );
    }

    const validTypes = [
      'resume_review',
      'mock_interview',
      'technical_guidance',
      'career_advice',
      'higher_studies',
      'startup_advice',
      'other'
    ];
    if (!validTypes.includes(requestType)) {
      return apiResponse.error(
        res,
        `Invalid requestType. Allowed values: ${validTypes.join(', ')}`,
        400
      );
    }

    // 1. Student Integrity & Standing Check (Anti-Abuse)
    if (studentUser.standing === 'cooldown' || (studentUser.strikes && studentUser.strikes >= 3)) {
      return apiResponse.error(
        res,
        'Mentorship Booking Restricted: Your account has accumulated multiple unexcused no-show strikes and is currently in cooldown under IIIT Delhi Placement & Academic Ethics guidelines. Please contact TPO.',
        403
      );
    }

    // 2. Concrete Quality & Intent Validation
    if (studentGoal.trim().length < 8) {
      return apiResponse.error(
        res,
        'Career goal is too brief. Please enter at least 8 characters detailing your target role or guidance area.',
        400
      );
    }

    if (message.trim().length < 15) {
      return apiResponse.error(
        res,
        'Context message is too brief. Please explain what specific questions or guidance you need (min 15 characters).',
        400
      );
    }

    // Resolve target alumni profile and user
    let targetProfile = null;
    let targetAlumniUser = null;

    if (alumniProfileId && mongoose.Types.ObjectId.isValid(alumniProfileId)) {
      targetProfile = await AlumniProfile.findById(alumniProfileId);
    }

    if (!targetProfile && alumniId && mongoose.Types.ObjectId.isValid(alumniId)) {
      targetProfile = await AlumniProfile.findOne({
        $or: [{ userId: alumniId }, { _id: alumniId }]
      });
    }

    if (!targetProfile) {
      return apiResponse.error(res, 'Target alumni profile could not be found', 404);
    }

    targetAlumniUser = await User.findById(targetProfile.userId);
    if (!targetAlumniUser || targetAlumniUser.status !== 'active') {
      return apiResponse.error(res, 'Target alumni is currently unavailable', 404);
    }

    // Anti-self-request check
    if (targetAlumniUser._id.equals(studentUser._id)) {
      return apiResponse.error(res, 'You cannot submit a mentorship request to yourself', 400);
    }

    // Availability check
    if (targetProfile.availability === 'paused') {
      return apiResponse.error(
        res,
        'This mentor is currently not accepting new mentorship requests (paused)',
        409
      );
    }

    // 3. Fair-Use Quota Check: Max 2 active pending requests per student across all mentors
    const activeRequestsCount = await MentorshipRequest.countDocuments({
      studentId: studentUser._id,
      status: { $in: ['pending', 'time_proposed'] }
    });

    if (activeRequestsCount >= 2) {
      return apiResponse.error(
        res,
        'Fair-Use Limit Exceeded: You currently have 2 active mentorship requests pending. To prevent alumni overload, please wait for an existing mentor to respond or cancel a pending request before booking another slot.',
        429
      );
    }

    // Prevent duplicate pending requests with the same alumni
    const existingActiveRequest = await MentorshipRequest.findOne({
      studentId: studentUser._id,
      alumniId: targetAlumniUser._id,
      status: { $in: ['pending', 'time_proposed'] }
    });

    if (existingActiveRequest) {
      return apiResponse.error(
        res,
        'You already have an active mentorship request with this alumni. Please wait for their response.',
        409
      );
    }

    const newRequest = await MentorshipRequest.create({
      studentId: studentUser._id,
      alumniId: targetAlumniUser._id,
      alumniProfileId: targetProfile._id,
      requestType,
      message: message.trim(),
      studentGoal: studentGoal.trim(),
      proposedSlots: Array.isArray(proposedSlots) ? proposedSlots : [],
      status: 'pending'
    });

    const populated = await MentorshipRequest.findById(newRequest._id)
      .populate('studentId', 'name email role')
      .populate('alumniId', 'name email role')
      .populate('alumniProfileId', 'department graduationYear currentRole employer avatarUrl');

    return apiResponse.success(
      res,
      populated,
      'Mentorship request submitted successfully',
      201
    );
  } catch (error) {
    next(error);
  }
}

export async function getOwnMentorshipRequests(req, res, next) {
  try {
    const user = req.user;
    const { status } = req.query;
    const filter = {};

    if (status && ['pending', 'accepted', 'declined', 'time_proposed', 'completed', 'cancelled'].includes(status)) {
      filter.status = status;
    }

    if (user.role === 'student') {
      filter.studentId = user._id;
    } else if (user.role === 'alumni') {
      filter.alumniId = user._id;
    }
    // Admin can view all requests for moderation/support

    const requests = await MentorshipRequest.find(filter)
      .sort({ createdAt: -1 })
      .populate('studentId', 'name email role')
      .populate('alumniId', 'name email role')
      .populate('alumniProfileId', 'department graduationYear currentRole employer avatarUrl');

    return apiResponse.success(
      res,
      requests,
      'Mentorship requests retrieved successfully',
      200
    );
  } catch (error) {
    next(error);
  }
}

export async function getMentorshipRequestById(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;

    const request = await MentorshipRequest.findById(id)
      .populate('studentId', 'name email role')
      .populate('alumniId', 'name email role')
      .populate('alumniProfileId', 'department graduationYear currentRole employer avatarUrl');

    if (!request) {
      return apiResponse.error(res, 'Mentorship request not found', 404);
    }

    // Authorization & Ownership check: Only student, addressed alumni, or admin can access
    const isStudent = request.studentId._id.equals(user._id);
    const isAlumni = request.alumniId._id.equals(user._id);
    const isAdmin = user.role === 'admin';

    if (!isStudent && !isAlumni && !isAdmin) {
      return apiResponse.error(
        res,
        'Forbidden: You are not authorized to view this mentorship request',
        403
      );
    }

    return apiResponse.success(
      res,
      request,
      'Mentorship request retrieved successfully',
      200
    );
  } catch (error) {
    next(error);
  }
}

export async function updateMentorshipRequestStatus(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    const { status, responseMessage = '', acceptedSlot = '', proposedSlots = [] } = req.body;

    const request = await MentorshipRequest.findById(id);
    if (!request) {
      return apiResponse.error(res, 'Mentorship request not found', 404);
    }

    const isStudent = request.studentId.equals(user._id);
    const isAlumni = request.alumniId.equals(user._id);
    const isAdmin = user.role === 'admin';

    if (!isStudent && !isAlumni && !isAdmin) {
      return apiResponse.error(
        res,
        'Forbidden: You do not have permission to modify this mentorship request',
        403
      );
    }

    // Terminal status rule
    if (['completed', 'declined', 'cancelled', 'no_show_reported'].includes(request.status)) {
      return apiResponse.error(
        res,
        `Cannot modify request: This request is already in a terminal state ('${request.status}')`,
        400
      );
    }

    // Role-specific allowed transitions
    if (isAlumni || isAdmin) {
      const allowedForAlumni = ['accepted', 'declined', 'time_proposed', 'completed', 'no_show_reported'];
      if (!allowedForAlumni.includes(status)) {
        return apiResponse.error(
          res,
          `Invalid transition for alumni. Allowed: ${allowedForAlumni.join(', ')}`,
          400
        );
      }

      request.status = status;
      if (responseMessage) request.responseMessage = responseMessage.trim();
      if (acceptedSlot) request.acceptedSlot = acceptedSlot.trim();
      if (proposedSlots && proposedSlots.length > 0) request.proposedSlots = proposedSlots;
      if (status === 'completed') request.completedAt = new Date();

      if (status === 'no_show_reported') {
        const { reportReason = '' } = req.body;
        request.reportReason = reportReason.trim() || 'Student failed to attend the scheduled session without prior notice.';
        request.reportedAt = new Date();

        // Institutional accountability: increment student strikes
        const student = await User.findById(request.studentId);
        if (student) {
          student.strikes = (student.strikes || 0) + 1;
          if (student.strikes >= 3) {
            student.standing = 'cooldown';
          } else if (student.strikes >= 1) {
            student.standing = 'warning';
          }
          await student.save();
        }
      }
    } else if (isStudent) {
      // Student can cancel, or accept if alumni proposed a time
      if (status === 'cancelled') {
        request.status = 'cancelled';
        if (responseMessage) request.responseMessage = responseMessage.trim();
      } else if (status === 'accepted' && request.status === 'time_proposed') {
        request.status = 'accepted';
        if (acceptedSlot) request.acceptedSlot = acceptedSlot.trim();
      } else {
        return apiResponse.error(
          res,
          "Students can only 'cancel' a pending request or 'accept' an alumni's proposed time slot",
          400
        );
      }
    }

    await request.save();

    const populated = await MentorshipRequest.findById(request._id)
      .populate('studentId', 'name email role')
      .populate('alumniId', 'name email role')
      .populate('alumniProfileId', 'department graduationYear currentRole employer avatarUrl');

    return apiResponse.success(
      res,
      populated,
      `Mentorship request updated to '${status}'`,
      200
    );
  } catch (error) {
    next(error);
  }
}
