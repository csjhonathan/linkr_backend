import { Router } from 'express';
import postsController from '../controllers/posts.controller.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import schemaValidator from '../middlewares/schemaValidator.middleware.js';
import postSchema from '../schemas/posts.schema.js';

const postsRoutes = Router();

postsRoutes.post('/posts', tokenValidator, schemaValidator(postSchema), postsController.create);
postsRoutes.get('/posts/user/:userId', tokenValidator, postsController.listUserTimeline);
postsRoutes.get('/posts/:userId', tokenValidator, postsController.listTimelinePosts);

export default postsRoutes;
