import express, { Application, Router } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import UserRoutes from './routes/Users.Route';
import ArticleRoutes from './routes/Article.Route';
import AuthRoutes from './routes/Auth.Route';

import { isAuthorized } from './libs/authentication';

// * Initializations * /
const PREFIX = `/api`;
const V1 = `v1`;
const app: Application = express();

// * Configuration */
app.set('port', 3000 || process.env.PORT);

// * Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(helmet());
app.use(cors());

// * Routes */
app.use(`${PREFIX}/${V1}`, ArticleRoutes);
app.use(`${PREFIX}/${V1}`, AuthRoutes);
app.use(`${PREFIX}/${V1}`, isAuthorized, UserRoutes);

export default app;
