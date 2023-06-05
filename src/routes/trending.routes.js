import { Router } from 'express';
import { listTrending, listHashtagById } from '../controllers/trending.controller.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';

const trendingRoutes = Router();

trendingRoutes.get('/trending', tokenValidator, listTrending);
trendingRoutes.get('/trending/:hashtag', tokenValidator, listHashtagById);
export default trendingRoutes;
