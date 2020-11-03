import { Request, Response } from 'express';
import ArticleModel from '../models/Article.Model';
import UserModel, { IUser } from '../models/User.Model';

interface IBlogRequestBody {
  title: string;
  comments: string;
  content: string;
  author: string;
  category: string;
  userId: string;
}

// ** POST ONE ARTICLE */
export const createArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { category, comments, content, title }: IBlogRequestBody = req.body;

  const newArticle = new ArticleModel({
    category,
    comments,
    content,
    title,
    author: req.userId,
  });

  try {
    const article = await newArticle.save();

    try {
      await UserModel.update(
        { _id: req.userId },
        { $push: { posts: newArticle } }
      );
    } catch (error) {
      console.log('error', error);
    }
    return res.status(200).json(article);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// * GET ALL ARTICLES */
export const getArticles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = req.query;
    const articles = await ArticleModel.find(query).populate('author');

    return res.status(200).json({
      articles,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// * GET ONE ARTICLE * /
export const getOneArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const article = await ArticleModel.findOne({ uid: req.userId }).populate({
      path: 'author',
    });

    return res.status(200).json({
      article,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// * UPDATE ONE ARTICLE * /
export const updateArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, categories, content } = req.body;

  try {
    const oldArticle = await ArticleModel.findOneAndUpdate(
      { _id: req.params.articleId },
      {
        title,
        categories,
        content,
      }
    );

    const newArticle = await ArticleModel.findById(req.params.articleId);

    return res.status(200).json({
      oldArticle,
      newArticle,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// * DELETE ONE ARTICLE * /
export const deleteArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const article = await ArticleModel.findOneAndDelete({
      _id: req.params.articleId,
    });
    if (!article) {
      return res.status(400).json({ message: 'Item does not exist' });
    }

    return res.status(200).json({
      article,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
