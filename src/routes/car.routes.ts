import { Router } from 'express';
import {createCar, getCars, updateCar, deleteCar, getCar} from '../controllers/cars.controllers'
import { checkJwt } from '../middlewares/checkJwt';

const router = Router()

router.post('/cars', [checkJwt], createCar)

router.get('/cars', [checkJwt], getCars)

router.put('/cars/:id', updateCar)

router.delete('/cars/:id', deleteCar)

router.get('/cars/:id', getCar)

export default router