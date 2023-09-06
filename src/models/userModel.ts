import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
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

userSchema.pre('save', async function(this: UserDocument, next: () => void) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
// Create and export the User model
export const UserModel = mongoose.model<UserDocument>('User', userSchema);
