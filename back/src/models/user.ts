import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

export async function validateUser(
  email: string,
  password: string
): Promise<IUser | null> {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user as IUser;
  }
  return null;
}
