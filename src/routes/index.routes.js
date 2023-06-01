import { Router } from 'express';
import usersRoutes from './users.routes.js';
import likesRouter from './likes.routes.js';

const routes = Router();

routes.use(usersRoutes);
routes.use(likesRouter);

export default routes;
