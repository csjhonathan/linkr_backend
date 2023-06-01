import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import likePost from '../controllers/likes.controllers.js';
import validateLike from '../middlewares/likes.middleware.js';

const likesRouter = Router();

likesRouter.post('/likes/posts/:postId', tokenValidator, validateLike, likePost);

export default likesRouter;
