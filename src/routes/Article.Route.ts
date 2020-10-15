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

import { Router } from 'express';

const ArticlesRouter: Router = Router();

ArticlesRouter.get('/articles', getArticles);

ArticlesRouter.post('/articles', createArticle);
ArticlesRouter.put('/articles/:articleId', updateArticle);
ArticlesRouter.delete('/articles/:articleId', deleteArticle);
ArticlesRouter.get('/articles/:id', getOneArticle);

ArticlesRouter.post('/articles/:articleId/comments', createComment);
ArticlesRouter.get('/articles/:articleId/comments', getComments);
ArticlesRouter.put('/articles/:articleId/comments/:commentId', updateComment);
ArticlesRouter.delete(
  '/articles/:articleId/comments/:commentId',
  deleteComment
);

ArticlesRouter.get('/comments', getAllComments);
export default ArticlesRouter;
