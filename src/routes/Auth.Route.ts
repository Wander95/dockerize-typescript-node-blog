import { Router } from 'express';
import { signIn, signUp } from '../controllers/Auth.Controller';

const AuthRouter = Router();

AuthRouter.post('/signup', signUp);
AuthRouter.get('/signin', signIn);

export default AuthRouter;
