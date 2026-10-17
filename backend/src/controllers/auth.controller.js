import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { AlumniProfile } from '../models/AlumniProfile.js';
import { apiResponse } from '../utils/apiResponse.js';

function signToken(userId, role) {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role = 'student', department, graduationYear } = req.body;

    if (!name || !email || !password) {
      return apiResponse.error(res, 'Name, email, and password are required', 400);
    }

    if (password.length < 8) {
      return apiResponse.error(res, 'Password must be at least 8 characters long', 400);
    }

    // Security rule: Never allow public registration to claim admin role
    if (role === 'admin') {
      return apiResponse.error(res, 'Administrator accounts cannot be created via public registration', 403);
    }

    if (!['student', 'alumni'].includes(role)) {
      return apiResponse.error(res, 'Role must be either student or alumni', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return apiResponse.error(res, 'An account with this email address already exists', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      status: 'active'
    });

    let profile = null;
    if (role === 'alumni') {
      profile = await AlumniProfile.create({
        userId: user._id,
        name: user.name,
        department: department || 'General Studies',
        graduationYear: graduationYear || new Date().getFullYear(),
        collegeVerificationStatus: 'unverified',
        employmentVerificationStatus: 'unverified'
      });
    }

    const token = signToken(user._id, user.role);

    return apiResponse.success(
      res,
      {
        token,
        user: user.toSafeJSON(),
        profile: profile ? profile.toPublicJSON() : null
      },
      'Registration successful',
      201
    );
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return apiResponse.error(res, 'Email and password are required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

    if (!user) {
      return apiResponse.error(res, 'Invalid email or password', 401);
    }

    if (user.status !== 'active') {
      return apiResponse.error(res, 'This account has been deactivated. Please contact support.', 403);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return apiResponse.error(res, 'Invalid email or password', 401);
    }

    const token = signToken(user._id, user.role);

    let profile = null;
    if (user.role === 'alumni') {
      profile = await AlumniProfile.findOne({ userId: user._id });
    }

    return apiResponse.success(
      res,
      {
        token,
        user: user.toSafeJSON(),
        profile: profile ? profile.toPublicJSON() : null
      },
      'Authentication successful',
      200
    );
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = req.user;
    let profile = null;

    if (user.role === 'alumni') {
      profile = await AlumniProfile.findOne({ userId: user._id });
    }

    return apiResponse.success(
      res,
      {
        user: user.toSafeJSON(),
        profile: profile ? profile.toPublicJSON() : null
      },
      'User profile retrieved',
      200
    );
  } catch (error) {
    next(error);
  }
}
