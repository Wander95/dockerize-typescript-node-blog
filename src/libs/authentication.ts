import { Request, Response, NextFunction } from 'express';
import { firebase_admin } from '../firebaseConfig';
import UserModel from '../models/User.Model';

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).json({
      message: 'invalid token',
    });
  }

  try {
    const firebaseUser = await firebase_admin.auth().verifyIdToken(token);
    const mongoUser = await UserModel.findOne({ uid: firebaseUser.uid });
    req.userId = mongoUser?._id;
    next();
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
