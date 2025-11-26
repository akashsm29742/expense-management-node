import { Schema, model, Document, Types } from "mongoose";
import { IRole } from "../roles/role.model";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId | IRole;
  manager?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    manager: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
