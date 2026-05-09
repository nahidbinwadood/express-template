import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';

interface IRoutes {
  path: string;
  route: Router;
}

const router: Router = Router();

const allRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
];

allRoutes.map((item) => router.use(item.path, item.route));

export default router;
