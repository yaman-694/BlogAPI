import mongoose, { Document, Schema } from 'mongoose';

// Define the User schema
export interface UserDocument extends Document {
  display_name: string;
  email: string;
  password: string;
  userId: string;
}

const userSchema = new Schema<UserDocument>({
  display_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the User model
export const UserModel = mongoose.model<UserDocument>('User', userSchema);
