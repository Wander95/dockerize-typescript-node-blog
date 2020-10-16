import { Router } from 'express';
import { signIn, signUp } from '../controllers/Auth.Controller';

const AuthRouter = Router();

AuthRouter.post('/auth', signUp);
AuthRouter.post('/auth', signIn);

export default AuthRouter;
