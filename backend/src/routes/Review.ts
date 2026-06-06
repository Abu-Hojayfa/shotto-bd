import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  officeId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>(
  {
    officeId: {
      type: Schema.Types.ObjectId,
      ref: 'Office',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: '',
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IReview>('Review', reviewSchema);