import mongoose, { Document, Schema } from 'mongoose';

export interface IOffice extends Document {
  name: string;
  location: string;
  category: string;
  averageRating: number;
  totalReviews: number;
}

const officeSchema = new Schema<IOffice>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IOffice>('Office', officeSchema);