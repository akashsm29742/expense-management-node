import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  permissions: string[];
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
});

export const Role = model<IRole>("Role", roleSchema);
