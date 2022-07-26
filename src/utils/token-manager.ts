import { Request, Response, NextFunction } from "express"
import config from "../config/config"
import * as jwt from "jsonwebtoken"


export const generateRefreshToken = (userId: any, username: any, res: Response) => {
    const expiresIn = 60 * 60;
    console.log('generando token')
    try {
        const refreshToken = jwt.sign({ userId, username }, config.keySecretRefresh, {
            expiresIn,
        });

        console.log(refreshToken)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + expiresIn * 1000),
            sameSite: "none",
        });
        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     expires: new Date(Date.now() + expiresIn * 1000),
        // });
    } catch (error) {
        console.log(error);
    }
};

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
};