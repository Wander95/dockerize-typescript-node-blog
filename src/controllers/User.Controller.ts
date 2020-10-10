import { Request, Response } from 'express';
import UserModel from '../models/User.Model';
import SocialMediaModelUserRel from '../models/Relations/SocialMedia-User.relation';
import SocialMediaListModel from '../models/Relations/SocialMediaList.Model';
interface ISocialMedia {
  link: string;
  socialMedia: string;
}

interface ISocialMediaList {}

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
    let user;
    let socialMediaList;
    const socialMediaIds: any = [];

    try {
      socialMediaList = Promise.all(
        socialMedias.map(async (social: ISocialMedia) => {
          const socialMediaLink = new SocialMediaListModel({
            link: social.link,
            socialMediaId: social.socialMedia,
            userId: newUser._id,
          });

          try {
            socialMediaIds.push(socialMediaLink._id);
            await socialMediaLink.save();
          } catch (error) {
            console.log('relationship error', error);
          }
        })
      );
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
    user = await newUser.save();
    await user.update({ socialMedia: socialMediaIds });
    return res.status(200).json({
      user,
      testingRel: socialMediaList,
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

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id }).populate(
      'socialMedia'
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
