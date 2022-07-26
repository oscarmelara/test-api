import { Request, Response } from "express"
import { Car } from '../entities/Car';

export const createCar = async (req: Request, res: Response) => {
    try {
        const {
            brand,
            model,
            color,
            state,
            assigned 
        } = req.body
        
        const car = new Car()
        
        car.brand = brand
        car.model = model
        car.color = color
        car.state = state
        car.assigned = assigned
    
        await car.save()

        return res.json(car)
        
    } catch (error) {
        if(error instanceof Error)
        return res.status(500).json({message: error.message})
    }
}


export const getCars = async (req: Request, res: Response) => {
    try {
        const cars = await Car.find()
        return res.json(cars)
        
    } catch (error) {
        if(error instanceof Error)
        return res.status(500).json({message: error.message})
    }
}

export const updateCar = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const car = await Car.findOneBy({id: parseInt(req.params.id)})

        if (!car) return res.status(404).json({message: 'Automovil no encontrado'})

        await Car.update({id: parseInt(id)}, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }

}

export const deleteCar = async (req: Request, res: Response) => { 
    try {
        const {id} = req.params
        console.log(id)
        const result = await Car.delete({id: parseInt(id)})

        if(result.affected === 0) return res.status(404).json({message: 'Automovil no encontrado'})
        
        return res.sendStatus(204)

    } catch (error) {
        if(error instanceof Error) return res.status(500).json({message: error.message})  
    }
}

export const getCar = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const car = await Car.findOneBy({id: parseInt(id)})
        return res.json(car) 

    } catch (error) {
        if(error instanceof Error) return res.status(500).json({message: error.message}) 
    }
}