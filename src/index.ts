import "reflect-metadata"
import app from './app'
import { AppDataSource } from './db'

async function main() {
    try {
        await AppDataSource.initialize()
        app.listen(process.env.PORT || 5000)
        console.log('DB connected')
        
    } catch (error) {
        console.log(error)  
    }
}

main();

