import {
  createArticle,
  getArticles,
  getOneArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/Article.Controller';

import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  getAllComments,
} from '../controllers/Comment.Controller';

import { isAuthorized } from '../libs/authentication';

import { Router } from 'express';

const ArticlesRouter: Router = Router();

ArticlesRouter.get('/articles', getArticles);

ArticlesRouter.post('/articles', isAuthorized, createArticle);
ArticlesRouter.put('/articles/:articleId', isAuthorized, updateArticle);
ArticlesRouter.delete('/articles/:articleId', isAuthorized, deleteArticle);
ArticlesRouter.get('/articles/:id', getOneArticle);

ArticlesRouter.post(
  '/articles/:articleId/comments',
  isAuthorized,
  createComment
);
ArticlesRouter.get('/articles/:articleId/comments', getComments);
ArticlesRouter.put(
  '/articles/:articleId/comments/:commentId',
  isAuthorized,
  updateComment
);
ArticlesRouter.delete(
  '/articles/:articleId/comments/:commentId',
  isAuthorized,
  deleteComment
);

ArticlesRouter.get('/comments', getAllComments);
export default ArticlesRouter;
