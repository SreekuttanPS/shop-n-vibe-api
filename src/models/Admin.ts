import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for Admin document
export interface IAdmin extends Document {
  username: string;
  password: string;
  comparePassword(inputPassword: string): Promise<boolean>;
}

// Schema definition
const adminSchema = new mongoose.Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
adminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function (inputPassword: string): Promise<boolean> {
  return bcrypt.compare(inputPassword, this.password);
};

// Export typed model
export const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);
