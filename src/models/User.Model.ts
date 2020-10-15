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
export enum SocialMediaList {
  'facebook',
  'twitter',
  'github',
  'linkedIn',
  'instagram',
  'youtube',
}

const networkList = [
  'facebook',
  'twitter',
  'github',
  'linkedIn',
  'instagram',
  'youtube',
];

const UserSchema: Schema<IUser> = new Schema(
  {
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
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
    socialMedias: [
      {
        link: {
          type: String,
          required: true,
        },
        network: {
          type: String,
          enum: networkList,
        },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('fullName').get(function (this: IUser): string {
  return `${this.name}  ${this.lastName}`;
});

export default model('User', UserSchema);
