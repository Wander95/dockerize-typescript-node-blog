import { Request, Response } from 'express';
import UserModel from '../models/User.Model';
import ArticleModel from '../models/Article.Model';
interface IBlogRequestBody {
  title: string;
  comments: string;
  content: string;
  author: string;
  category: string;
  userId: string;
}

export const createArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    category,
    comments,
    content,
    title,
    userId,
  }: IBlogRequestBody = req.body;

  const newArticle = new ArticleModel({
    category,
    comments,
    content,
    title,
    author: userId,
  });

  try {
    const article = await newArticle.save();
    return res.status(200).json(article);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({
      error,
    });
  }
};

export const getArticles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const articles = await ArticleModel.find();

    return res.status(200).json({
      articles,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const getOneArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const article = await ArticleModel.findOne({ _id: req.params.id }).populate(
      'author'
    );

    return res.status(200).json({
      article,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
