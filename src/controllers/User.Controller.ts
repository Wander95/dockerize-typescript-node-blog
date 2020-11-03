import { Request, Response } from 'express';
import UserModel, { SocialMediaList } from '../models/User.Model';
interface ISocialMedia {
  link: string;
  socialMedia: SocialMediaList;
}

interface IUserRequestBody {
  name: string;
  lastName: string;
  bio: string;
  email: string;
  socialMedias: ISocialMedia[];
}

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = req.query;
    const users = await UserModel.find(query);

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    name,
    lastName,
    bio,
    email,
    socialMedias,
  }: IUserRequestBody = req.body;

  const newUser = new UserModel({
    name,
    lastName,
    bio,
    email,
    socialMedias,
  });

  try {
    const user = await newUser.save();
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await UserModel.findOne({ uid: req.userId }).populate('posts');

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, lastName, bio, socialMedias } = req.body;

  try {
    const oldUser = await UserModel.findByIdAndUpdate(req.params.userId, {
      name,
      lastName,
      bio,
      socialMedias,
    });

    const newUser = await UserModel.findOne({ uid: req.userId });

    return res.status(200).json({
      old: oldUser,
      new: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: 'Item does not exist' });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
