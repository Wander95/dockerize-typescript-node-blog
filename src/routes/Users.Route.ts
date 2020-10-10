import {
  createUser,
  getUsers,
  getOneUser,
} from '../controllers/User.Controller';
import { Router } from 'express';

const UserRouter: Router = Router();

UserRouter.get('/user', getUsers);

UserRouter.post('/user', createUser);
// UserRouter.post('/:{id}', () => {});
UserRouter.get('/user/:id', getOneUser);

export default UserRouter;
