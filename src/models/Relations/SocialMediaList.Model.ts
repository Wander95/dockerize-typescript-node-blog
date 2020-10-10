import { model, Document, Schema } from 'mongoose';

export interface ISocialMediaList extends Document {
  link: string;
  userId: string;
  socialMediaId: string;
}

const SocialMediaList: Schema<ISocialMediaList> = new Schema({
  link: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  socialMediaId: {
    type: Schema.Types.ObjectId,
    ref: 'SocialMedia',
  },
});

export default model<ISocialMediaList>('SocialMediaList', SocialMediaList);
