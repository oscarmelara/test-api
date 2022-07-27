import { Router } from 'express';
import {createCar, getCars, updateCar, deleteCar, getCar} from '../controllers/cars.controllers'
import { checkJwt } from '../middlewares/checkJwt';

const router = Router()

router.post('/cars', [checkJwt], createCar)

router.get('/cars', [checkJwt], getCars)

router.put('/cars/:id', [checkJwt], updateCar)

router.delete('/cars/:id', [checkJwt], deleteCar)

router.get('/cars/:id', [checkJwt], getCar)

export default router