import { Router } from 'express';
import postsController from '../controllers/posts.controller.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import schemaValidator from '../middlewares/schemaValidator.middleware.js';
import postSchema from '../schemas/posts.schema.js';
import validUserById from '../middlewares/validUserById.js';

const postsRoutes = Router();

postsRoutes.use(tokenValidator);

postsRoutes.post('/posts', schemaValidator(postSchema), postsController.create);
postsRoutes.get('/posts/user/:id', validUserById, postsController.listUserTimeline);
postsRoutes.get('/posts', postsController.listTimelinePosts);

export default postsRoutes;
