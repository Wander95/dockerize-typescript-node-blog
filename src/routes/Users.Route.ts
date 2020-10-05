import {
  createUser,
  getUsers,
  getOneUsers,
} from '../controllers/User.Controller';
import { Router } from 'express';

const UserRouter: Router = Router();

UserRouter.get('/user', getUsers);

UserRouter.post('/user', createUser);
// UserRouter.post('/:{id}', () => {});
UserRouter.get('/user/:id', getOneUsers);

export default UserRouter;
