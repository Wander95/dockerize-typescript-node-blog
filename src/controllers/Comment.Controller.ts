import { Request, Response } from 'express';
import CommentModel from '../models/Comment.Model';
import ArticleModel from '../models/Article.Model';
export interface ICommentBodyRequest {
  body: string;
  userId: string;
}

export const getComments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { articleId } = req.params;

  try {
    const model = await CommentModel.find()
      .where('articleId')
      .equals(articleId)
      .populate('userId');
    return res.status(200).json({
      model,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

export const createComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body, userId }: ICommentBodyRequest = req.body;
  const { articleId } = req.params;
  const newComment = new CommentModel({
    body,
    articleId,
    userId: req.userId,
  });

  await ArticleModel.update(
    { _id: articleId },
    { $push: { comments: newComment._id } }
  );

  try {
    await newComment.save();
    return res.status(200).json({
      newComment,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

export const updateComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body, userId }: ICommentBodyRequest = req.body;
  const { commentId } = req.params;

  try {
    const oldComment = await CommentModel.findByIdAndUpdate(commentId, {
      body,
    });

    const newComment = await CommentModel.findById(commentId);

    return res.status(200).json({
      old: oldComment,
      new: newComment,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { commentId } = req.params;

  try {
    const comment = await CommentModel.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(400).json({ response: 'Item does not exist' });
    }

    return res.status(200).json({
      deleted: true,
      comment,
    });
  } catch (err) {
    return res.status(400).json({
      deleted: false,
      err,
    });
  }
};

export const getAllComments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const model = await CommentModel.find();
    return res.status(200).json({
      model,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};
