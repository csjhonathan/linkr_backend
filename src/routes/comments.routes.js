import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import schemaValidator from '../middlewares/schemaValidator.middleware.js';
import commentSchema from '../schemas/comments.schema.js';
import postComment from '../controllers/comments.controllers.js';
import { postExistsValidation } from '../middlewares/posts.middleware.js';

const commentsRouter = Router();

commentsRouter.use(tokenValidator);

commentsRouter.post('/comments/posts/:postId', schemaValidator(commentSchema), postExistsValidation, postComment);

export default commentsRouter;
