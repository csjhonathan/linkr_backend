import { Router } from 'express';
import { signUp } from '../controllers/users.controllers.js';
import * as schema from '../schemas/user.schemas.js';
import schemaValidator from '../middlewares/schemaValidator.middleware.js';
import userVerifierExists from '../middlewares/userVerifierExists.js';

const usersRoutes = Router();

usersRoutes.post('/signup', schemaValidator(schema.signUp), userVerifierExists, signUp);

export default usersRoutes;
