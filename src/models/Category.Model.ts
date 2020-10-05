import { model, Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
}

const stringConstraints = {
  type: String,
  required: true,
  min: 4,
  lowercase: true,
};

const CategorySchema = new Schema({
  name: stringConstraints,
  description: stringConstraints,
});

export default model<ICategory>('Category', CategorySchema);
