import { Router } from 'express';
import usersRoutes from './users.routes.js';
import postsRoutes from './posts.routes.js';
import likesRouter from './likes.routes.js';
import trendingRoutes from './trending.routes.js';
import searchRoutes from './search.routes.js';

const routes = Router();

routes.use(usersRoutes);
routes.use(postsRoutes);
routes.use(likesRouter);
routes.use(trendingRoutes);
routes.use(searchRoutes);

export default routes;
