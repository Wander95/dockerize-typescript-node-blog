import { Request, Response } from 'express';
import SocialMediaModel from '../models/SocialMedia.Model';

export const createSocialMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description } = req.body;
  try {
    const socialMedia = await SocialMediaModel.create({ name, description });

    return res.status(200).json({
      socialMedia,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const getSocialMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const socialMedias = await SocialMediaModel.find();
    return res.status(200).json({
      socialMedias,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export const updateSocialMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    const previousSocialMedia = await SocialMediaModel.findByIdAndUpdate(id, {
      name,
      description,
    });

    const newSocialMedia = await SocialMediaModel.findOne({ _id: id });

    return res.status(200).json({
      previous: previousSocialMedia,
      new: newSocialMedia,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
