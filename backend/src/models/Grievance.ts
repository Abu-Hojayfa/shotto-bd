import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IGrievance extends Document {
  departmentId: mongoose.Types.ObjectId;
  trackingId: string;
  description: string;
  status: 'pending' | 'under_review' | 'resolved';
  responseNote: string;
  submittedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const grievanceSchema = new Schema<IGrievance>(
  {
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'GovernmentDepartment',
      required: [true, 'Department ID is required'],
    },
    trackingId: {
      type: String,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'resolved'],
      default: 'pending',
    },
    responseNote: {
      type: String,
      default: '',
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate a unique tracking ID
grievanceSchema.pre('save', function (next) {
  if (!this.trackingId) {
    const year = new Date().getFullYear();
    const random = crypto.randomBytes(3).toString('hex').toUpperCase();
    this.trackingId = `GRV-${year}-${random}`;
  }
  next();
});

export default mongoose.model<IGrievance>('Grievance', grievanceSchema);
