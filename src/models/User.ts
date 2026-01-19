import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
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
    isVerified: {
      type: Boolean,
      default: false,
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
    collection: "users" 
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
