import { Router } from 'express'
import profileRouter from './profile'
import menuRouter from './menu';
import itemsRouter from './items';
import orderRouter from './order';
import registerRouter from './register';


const router = Router()
router.use('/',registerRouter);
router.use('/profile',profileRouter);
router.use('/menu',menuRouter);
router.use('/items',itemsRouter);
router.use('/orders',orderRouter);
router.use('/orderItems',orderRouter);

export default router