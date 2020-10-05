import { model, Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  topic: string;
  createdDate: string;
  comments: string;
  content: string;
  user: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
}

const BlogSchema = new Schema({
  topic: String,
  createdDate: Date,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

export default model<IBlog>('Blog', BlogSchema);
