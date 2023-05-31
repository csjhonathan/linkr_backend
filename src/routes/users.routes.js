import { Router } from 'express';
import { signUp, signIn } from '../controllers/users.controllers.js';
import * as schema from '../schemas/user.schemas.js';
import schemaValidator from '../middlewares/schemaValidator.middleware.js';
import userVerifierExists from '../middlewares/userVerifierExists.middleware.js';

const usersRoutes = Router();

usersRoutes.post('/signup', schemaValidator(schema.signUp), userVerifierExists, signUp);
usersRoutes.post('/signin', schemaValidator(schema.signIn), userVerifierExists, signIn);

export default usersRoutes;
