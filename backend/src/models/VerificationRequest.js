import mongoose from 'mongoose';

const verificationRequestSchema = new mongoose.Schema(
  {
    alumniProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AlumniProfile',
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ['college_identity', 'employment'],
      default: 'college_identity'
    },
    evidenceRefs: [
      {
        type: {
          type: String,
          enum: ['enrollment_id', 'diploma_copy', 'transcript_id', 'institutional_email', 'sis_record_match', 'other'],
          default: 'enrollment_id'
        },
        referenceId: { type: String, trim: true },
        label: { type: String, trim: true },
        privateStoragePath: { type: String, trim: true }
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'needs_more_info'],
      default: 'pending',
      index: true
    },
    verificationMethod: {
      type: String,
      enum: ['college_record_match', 'document_review', 'approved_email_method', 'other'],
      default: 'college_record_match'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    reviewNote: {
      type: String,
      default: '',
      maxlength: 1000
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

export const VerificationRequest = mongoose.model('VerificationRequest', verificationRequestSchema);
