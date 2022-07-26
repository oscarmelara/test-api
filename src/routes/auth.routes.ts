import { Router } from 'express';
import {login, refreshToken, logout} from '../controllers/auth.controllers'

const router = Router()

router.post("/login", login)
router.get("/refresh", refreshToken)
router.get('/logout', logout)
export default router