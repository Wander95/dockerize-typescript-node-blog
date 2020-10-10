import { model, Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  createdDate: string;
  comments: string;
  content: string;
  author: string;
  category: string;
}

const ArticleSchema = new Schema({
  title: String,
  createdDate: Date,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  author: {
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

export default model<IArticle>('Article', ArticleSchema);
