import express, { Application, Router } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

const app: Application = express();

// * Configuration */
app.set('port', 3000 || process.env.PORT);

// * Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(helmet());

export default app;
