import { Router } from 'express';
import searchUsers from '../controllers/search.controllers.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';

const searchRoutes = Router();

searchRoutes.get('/search', tokenValidator, searchUsers);

export default searchRoutes;
