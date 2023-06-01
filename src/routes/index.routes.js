import { Router } from 'express';
import usersRoutes from './users.routes.js';
import trendingRoutes from './trending.routes.js';

const routes = Router();

routes.use(usersRoutes);
routes.use(trendingRoutes);

export default routes;
