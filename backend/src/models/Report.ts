import mongoose, { Document, Schema } from 'mongoose';

// ── Evidence Interface ────────────────────────────────────────────────────────
export interface IEvidence {
  id: number;
  type: string;
  url: string;
  title: string;
}

// ── Report Interface ──────────────────────────────────────────────────────────
export interface IReport extends Document {
  id: string; // The human-readable string code (e.g. SR-8921)
  title: string;
  category: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  date: string;
  description: string;
  reporter: string;
  reporterId?: mongoose.Types.ObjectId;
  remarks: string;
  priority?: 'Low' | 'Medium' | 'High';
  evidence?: IEvidence[];
  createdAt: Date;
  updatedAt: Date;
}

// ── Schema ────────────────────────────────────────────────────────────────────
const reportSchema = new Schema<IReport>(
  {
    id: {
      type: String,
      required: [true, 'Report ID code is required'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending',
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    reporter: {
      type: String,
      default: 'Anonymous',
    },
    reporterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    remarks: {
      type: String,
      default: '',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    evidence: [
      {
        id: { type: Number, required: true },
        type: { type: String, required: true },
        url: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'admin_dashboard', // Map directly to your Atlas collection
  }
);

// Indexes
reportSchema.index({ status: 1 });

export default mongoose.model<IReport>('Report', reportSchema);
