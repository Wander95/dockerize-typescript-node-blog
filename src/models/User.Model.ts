import { model, Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  bio: string;
  createdDate: Date;
  articles: string[];
  socialMedia: string[];
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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  bio: String,
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
  ],
  socialMedia: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SocialMediaList',
    },
  ],
});

UserSchema.plugin(uniqueValidator);

export default model('User', UserSchema);
