import mongoose, { Schema, Document } from "mongoose";

export interface IResult extends Document {
  // Define the fields you expect in your results collection here.
  // Using Schema.Types.Mixed allows for flexible JSON data if schemas aren't strict.
  data: any;
  createdAt: Date;
}

const ResultSchema: Schema = new Schema(
  {
    // If you have specific fields like 'name', 'score', etc., add them here.
    // For a generic mock API, 'strict: false' is often useful.
  },
  { 
    strict: false, // Allows saving/fetching fields not explicitly defined
    collection: "results", // Explicitly target the 'results' collection
    timestamps: true 
  }
);

// Check if the model already exists to prevent duplication errors during HMR
const Result = mongoose.models.Result || mongoose.model<IResult>("Result", ResultSchema);

export default Result;
