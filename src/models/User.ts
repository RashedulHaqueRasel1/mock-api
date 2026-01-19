import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  lastLogin?: Date;
  accessToken?: string;
  refreshToken?: string;
  secureToken?: string;
  refreshTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    secureToken: {
      type: String,
    },
    refreshTokenExpires: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },
  },
  { 
    timestamps: true,
    collection: "users",
    strict: false // Allow flexible fields just in case
  }
);

// Force model re-registration during development to ensure schema changes are applied
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.User;
}

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
