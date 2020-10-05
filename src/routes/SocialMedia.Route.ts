import {
  createSocialMedia,
  getSocialMedia,
  updateSocialMedia,
} from '../controllers/SocialMedia.Controller';
import { Router } from 'express';

const SocialMediaRouter: Router = Router();

SocialMediaRouter.get('/social', getSocialMedia);
// router.get('/:{id}', () => {});

SocialMediaRouter.post('/social', createSocialMedia);
SocialMediaRouter.put('/social/:id', updateSocialMedia);

export default SocialMediaRouter;
