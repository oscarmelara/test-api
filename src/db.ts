import { DataSource } from 'typeorm'
import { Car } from './entities/Car'
import { User } from './entities/User'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'password',
    port: 5432,
    database: 'admincardb',
    entities: [Car, User],
    logging: true,
    synchronize: true
})