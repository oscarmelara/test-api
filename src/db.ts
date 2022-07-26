import { DataSource } from 'typeorm'
import { Car } from './entities/Car'
import { User } from './entities/User'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_HOST,
    password: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 3306,
    database: process.env.DATABASE_HOST,
    entities: [Car, User],
    logging: true,
    synchronize: true
})