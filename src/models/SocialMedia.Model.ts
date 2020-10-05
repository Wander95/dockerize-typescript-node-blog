import { model, Schema, Document } from 'mongoose';

export interface ISocialMedia extends Document {
  name: string;
  description: string;
}

const stringConstraints = {
  type: String,
  required: true,
  min: 4,
  lowercase: true,
};

const SocialMediaSchema = new Schema({
  name: stringConstraints,
  description: stringConstraints,
});

export default model<ISocialMedia>('SocialMedia', SocialMediaSchema);
