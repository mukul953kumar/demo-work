import mongoose from 'mongoose';

const mentorshipRequestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    alumniId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    alumniProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AlumniProfile',
      required: true,
      index: true
    },
    requestType: {
      type: String,
      enum: {
        values: [
          'resume_review',
          'mock_interview',
          'technical_guidance',
          'career_advice',
          'higher_studies',
          'startup_advice',
          'other'
        ],
        message: '{VALUE} is not a valid mentorship request type'
      },
      required: true
    },
    message: {
      type: String,
      required: [true, 'Request message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    studentGoal: {
      type: String,
      required: [true, 'Student career goal is required'],
      trim: true,
      maxlength: [500, 'Goal cannot exceed 500 characters']
    },
    proposedSlots: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'time_proposed', 'completed', 'cancelled', 'no_show_reported'],
      default: 'pending',
      index: true
    },
    responseMessage: {
      type: String,
      default: '',
      maxlength: 1000
    },
    acceptedSlot: {
      type: String,
      default: ''
    },
    reportReason: {
      type: String,
      default: '',
      maxlength: 1000
    },
    reportedAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    },
    isDemoData: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const MentorshipRequest = mongoose.model('MentorshipRequest', mentorshipRequestSchema);
