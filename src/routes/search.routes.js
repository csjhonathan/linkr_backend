import { Router } from 'express';
import { searchUsers } from '../controllers/search.controllers.js';

const searchRoutes = Router();

searchRoutes.get('/search', searchUsers);

export default searchRoutes;
