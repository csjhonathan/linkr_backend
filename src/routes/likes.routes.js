import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import { likePost, unlikePost } from '../controllers/likes.controllers.js';
import { validateLike, validateUnlike } from '../middlewares/likes.middleware.js';

const likesRouter = Router();

likesRouter.post('/likes/posts/:postId', tokenValidator, validateLike, likePost);
likesRouter.delete('/likes/posts/:postId', tokenValidator, validateUnlike, unlikePost);

export default likesRouter;
