import {
  createArticle,
  getArticles,
  getOneArticle,
} from '../controllers/Article.Controller';
import { Router } from 'express';

const ArticlesRouter: Router = Router();

ArticlesRouter.get('/articles', getArticles);

ArticlesRouter.post('/articles', createArticle);
// UserRouter.post('/:{id}', () => {});
ArticlesRouter.get('/articles/:id', getOneArticle);

export default ArticlesRouter;
