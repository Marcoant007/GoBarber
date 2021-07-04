import { request, response, Router } from "express";
import CreateUserService from "../services/CreateUsersService";

const usersRouter = Router();

usersRouter.post('/', async (request,response) => {
    try {
        const {name, email, password} = request.body;
        const createUserService = new CreateUserService()
        const createdUser = await createUserService.execute({
            email,
            name,
            password
        })
        
        delete createdUser.password
        return response.status(200).json(createdUser)
        
    } catch (err) {
        return response.status(400).json({error: err.message})
        
    }
})

export default usersRouter