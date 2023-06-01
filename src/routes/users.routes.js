import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/users.controllers.js';
import * as schema from '../schemas/user.schemas.js';
import schemaValidator from '../middlewares/schemaValidator.middleware.js';
import userVerifierExists from '../middlewares/userVerifierExists.middleware.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';

const usersRoutes = Router();

usersRoutes.post('/signup', schemaValidator(schema.signUp), userVerifierExists, signUp);
usersRoutes.post('/signin', schemaValidator(schema.signIn), userVerifierExists, signIn);
usersRoutes.post('/signout/:userId', tokenValidator, signOut);
export default usersRoutes;
