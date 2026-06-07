import mongoose, {
  Schema,
  Document,
  Types,
} from "mongoose";

export interface IEmergency
  extends Document {

  title: string;

  description: string;

  category: string;

  severity: string;

  location: string;

  status: string;

  reporterName: string;
}

const emergencySchema =
  new Schema<IEmergency>(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      severity: {
        type: String,

        enum: [
          "low",
          "medium",
          "high",
          "critical",
        ],

        default: "medium",
      },

      location: {
        type: String,
      },

      status: {
        type: String,
        default: "active",
      },

      reporterName: {
        type: String,
        default: "Anonymous Citizen",
      },
    },

    { timestamps: true }
  );

export default mongoose.model<IEmergency>(
  "Emergency",
  emergencySchema
);
