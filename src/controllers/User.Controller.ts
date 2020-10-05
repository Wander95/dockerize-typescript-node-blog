import { Request, Response } from 'express';
import UserModel from '../models/User.Model';
import SocialMediaModelUserRel from '../models/Relations/SocialMedia-User.relation';

interface ISocialMedia {
  link: string;
  socialMedia: string;
}

interface IUserRequestBody {
  name: string;
  lastName: string;
  bio: string;
  email: string;
  socialMedias: ISocialMedia[];
}

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
  });

  try {
    const user = await newUser.save();
    let testingRel;
    try {
      testingRel = Promise.all(
        socialMedias.map(async (social: ISocialMedia) => {
          const relationship = new SocialMediaModelUserRel({
            link: social.link,
            socialMediaId: social.socialMedia,
            userId: user._id,
          });

          try {
            await relationship.save();
          } catch (error) {
            console.log('relationship error', error);
          }
        })
      );
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({
        error,
      });
    }

    return res.status(200).json({
      user,
      testingRel,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await UserModel.find();
    const relationship = await SocialMediaModelUserRel.find();

    return res.status(200).json({
      users,
      relationship,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const getOneUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id }).populate(
      'socialmedia_userrelations'
    );

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
