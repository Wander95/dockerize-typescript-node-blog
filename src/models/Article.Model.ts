import { model, Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  comments: string;
  content: string;
  author: string;
  categories: string[];
}

const categories = ['life', 'tech', 'cooking', 'general'];

const ArticleSchema = new Schema(
  {
    title: String,
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
      required: true,
    },
    categories: [
      {
        type: String,
        enum: categories,
        required: true,
        default: ['general'],
      },
    ],
  },
  { timestamps: true }
);

export default model<IArticle>('Article', ArticleSchema);
