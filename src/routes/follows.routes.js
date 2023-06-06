import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import { followUser, unfollowUser } from '../controllers/follows.controllers.js';
import validUserById from '../middlewares/validUserById.js';

const followsRoutes = Router();

followsRoutes.post('/follow/:id', tokenValidator, validUserById, followUser);
followsRoutes.delete('/unfollow/:id', tokenValidator, validUserById, unfollowUser);

export default followsRoutes;
