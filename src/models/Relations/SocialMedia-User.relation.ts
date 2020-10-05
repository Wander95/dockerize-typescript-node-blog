import { model, Document, Schema } from 'mongoose';

// tslint:disable-next-line: class-name
export interface I_RSocialM_User extends Document {
  link: string;
  userId: string;
  socialMediaId: string;
}

const SocialMedia_User_Rel: Schema<I_RSocialM_User> = new Schema({
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

export default model<I_RSocialM_User>(
  'SocialMedia_UserRelation',
  SocialMedia_User_Rel
);
