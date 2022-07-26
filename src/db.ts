import { DataSource } from 'typeorm'
import { Car } from './entities/Car'
import { User } from './entities/User'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    entities: [Car, User],
    logging: true,
    synchronize: true,
    ssl: {
        rejectUnauthorized: false
    }
})