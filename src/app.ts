
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import "dotenv/config";
import carRoutes from './routes/car.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

import cookieParser from 'cookie-parser';


const app = express()

const whitelist = [process.env.ORIGIN_DEV , process.env.ORIGIN_PROD]
app.use(cors({
    origin: function (origin, callback) {
        console.log("origin", origin);
        if (!origin || whitelist.includes(origin)){
            return callback(null, origin)
        }
        return callback(null, 
            "Error de Cors: " + origin + " No tiene autorizacion!"
        )
    },
    credentials: true
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(authRoutes)
app.use(carRoutes)
app.use(userRoutes)

export default app