import { Router } from 'express';

import {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
} from '../controllers/User.Controller';

const UserRouter: Router = Router();

UserRouter.get('/user', getUsers);

UserRouter.post('/user', createUser);
UserRouter.put('/user/:userId', updateUser);
UserRouter.delete('/user/:userId', deleteUser);
UserRouter.get('/user/:id', getOneUser);

export default UserRouter;
