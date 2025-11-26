import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
