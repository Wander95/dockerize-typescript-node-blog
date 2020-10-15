import { model, Schema, Document } from 'mongoose';

export interface IComments extends Document {
  body: string;
  userId: Schema.Types.ObjectId;
  articleId: Schema.Types.ObjectId;
}

const CommentSchema: Schema<IComments> = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
  },
  { timestamps: true }
);

export default model<IComments>('Comment', CommentSchema);
