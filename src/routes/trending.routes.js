import { Router } from 'express';
import { listTrending, listHashtagById } from '../controllers/trending.controller.js';

const trendingRoutes = Router();

trendingRoutes.get('/trending', listTrending);
trendingRoutes.get('/trending/:hashtag', listHashtagById);
export default trendingRoutes;
