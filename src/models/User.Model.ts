import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  lastName: string;
  bio: string;
  createdDate: Date;
  blogs: Schema.Types.ObjectId[];
  socialMedia: Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bio: String,
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
  socialMedia: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SocialMedia',
    },
  ],
});

export default model('User', UserSchema);
