import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    department: {
      type: String,
      required: [true, 'Academic department is required'],
      trim: true,
      index: true
    },
    graduationYear: {
      type: Number,
      required: [true, 'Graduation year is required'],
      min: [1970, 'Graduation year must be 1970 or later'],
      max: [2035, 'Graduation year cannot be in the distant future'],
      index: true
    },
    currentRole: {
      type: String,
      default: 'Not provided',
      trim: true
    },
    employer: {
      type: String,
      default: 'Not provided',
      trim: true
    },
    industry: {
      type: String,
      default: 'Technology',
      trim: true,
      index: true
    },
    bio: {
      type: String,
      default: '',
      maxlength: 1500
    },
    skills: {
      type: [String],
      default: [],
      index: true
    },
    mentorshipTopics: {
      type: [String],
      default: [],
      index: true
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'paused'],
      default: 'available',
      index: true
    },
    collegeVerificationStatus: {
      type: String,
      enum: ['unverified', 'pending', 'verified', 'rejected', 'needs_more_info'],
      default: 'unverified',
      index: true
    },
    employmentVerificationStatus: {
      type: String,
      enum: ['unverified', 'pending', 'verified', 'rejected'],
      default: 'unverified'
    },
    publicLinks: [
      {
        title: { type: String, trim: true },
        url: { type: String, trim: true }
      }
    ],
    isDemoData: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

alumniProfileSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    userId: this.userId,
    name: this.name,
    avatarUrl: this.avatarUrl,
    department: this.department,
    graduationYear: this.graduationYear,
    currentRole: this.currentRole,
    employer: this.employer,
    industry: this.industry,
    bio: this.bio,
    skills: this.skills,
    mentorshipTopics: this.mentorshipTopics,
    availability: this.availability,
    collegeVerificationStatus: this.collegeVerificationStatus,
    employmentVerificationStatus: this.employmentVerificationStatus,
    publicLinks: this.publicLinks,
    isDemoData: this.isDemoData,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export const AlumniProfile = mongoose.model('AlumniProfile', alumniProfileSchema);
