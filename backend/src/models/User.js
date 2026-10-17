import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'alumni', 'admin'],
        message: '{VALUE} is not a supported role'
      },
      default: 'student'
    },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active'
    },
    strikes: {
      type: Number,
      default: 0
    },
    standing: {
      type: String,
      enum: ['good_standing', 'warning', 'cooldown', 'suspended'],
      default: 'good_standing'
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.toSafeJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    status: this.status,
    strikes: this.strikes || 0,
    standing: this.standing || 'good_standing',
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export const User = mongoose.model('User', userSchema);
