import { Router } from 'express';
import usersRoutes from './users.routes.js';
import postsRoutes from './posts.routes.js';
import likesRouter from './likes.routes.js';
import trendingRoutes from './trending.routes.js';
import searchRoutes from './search.routes.js';
import followsRoutes from './follows.routes.js';
import repostRoutes from './reposts.routes.js';
import commentsRouter from './comments.routes.js';

const routes = Router();

routes.use(usersRoutes);
routes.use(postsRoutes);
routes.use(likesRouter);
routes.use(trendingRoutes);
routes.use(searchRoutes);
routes.use(followsRoutes);
routes.use(repostRoutes);
routes.use(commentsRouter);

export default routes;