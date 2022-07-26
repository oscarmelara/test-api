import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import { Validate } from 'class-validator'

import { User } from '../entities/User'
import config from '../config/config'
import { generateRefreshToken } from '../utils/token-manager'

export const login = async (req: Request, res: Response) => {
    try {
        let { username, password } = req.body;
        if (!(username && password)) return res.status(400).json({ message: 'Envia datos porfavor' })

        const user = await User.findOneBy({username: username})

        if(!user) return res.status(403).json({message: 'Usuario no encontrado'})

        if (!user.checkIfUnencryptedPasswordIsValid(password)) return res.status(403).json({message: 'Contraseña incorrecta'})

        const token = jwt.sign({userId: user.id,username: user.username}, config.keySecret, {expiresIn: '1h'});
        generateRefreshToken(user.id, user.username, res)

        return res.status(201).json({token: token})
    } catch (error) {
        if(error instanceof Error) return res.status(500).json({message: error.message})  
    }
}

export const refreshToken = (req: Request, res: Response) => {
    try {
        let jwtPayload
        const resfreshTokenCookie = req.cookies.refreshToken;
        
        if (!resfreshTokenCookie) throw new Error("No bearer")
        
        jwtPayload = <any>jwt.verify(resfreshTokenCookie, config.keySecretRefresh);
        const { userId, username } = jwtPayload

        const token = jwt.sign({userId: userId,username: username}, config.keySecret, {expiresIn: '1h'});
        console.log(token)
        return res.status(201).json({token: token})
    }catch (error) {
        console.log(error)
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('refreshToken')
    res.json({ok: true})
}