import { Router } from 'express';
import usersRoutes from './users.routes.js';
import postsRoutes from './posts.routes.js';

const routes = Router();

routes.use(usersRoutes);
routes.use(postsRoutes);

export default routes;
