import { Request, Response } from "express"
import { User } from "../entities/User"
import { validate } from "class-validator";

export const createUser = async (req: Request, res: Response) => {
        const {
            username,
            password
        } = req.body
        
        const user = new User()
        
        user.username = username
        user.password = password
        
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        
        user.hashPassword()

        const userExist = await User.getRepository()

        try {
           await userExist.save(user) 
        } catch (error) {
            res.status(409).json({message: 'El usuario ya existe'});
            return;
        }
    
        return res.json(user)
        

}