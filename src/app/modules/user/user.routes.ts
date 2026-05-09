import { Router } from 'express';
import { UserController } from './user.controller';

const userRoutes = Router();

userRoutes.get('/',UserController.getAllUser)


export default userRoutes
