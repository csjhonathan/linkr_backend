import { Router } from 'express';
import { rePost } from '../controllers/reposts.controller.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';

const repostRoutes = Router();

repostRoutes.post('/repost', tokenValidator, rePost);

export default repostRoutes;
