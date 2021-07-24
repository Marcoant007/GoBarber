import { hash } from "bcrypt";
import { getRepository } from "typeorm";
import User from "../../models/User";
import AppError from '../../errors/AppError';
interface IUser {
    name: string;
    email: string;
    password: string;
}
class CreateUserService {
    public async execute({name,email,password}:IUser): Promise<User>{
        const usersRepository = getRepository(User);
        const chekUserExists = await usersRepository.findOne({
            where : {email}
        })
        if(chekUserExists){
            throw new AppError('Email addresss already used');
        }

        const hashedPassword = await hash(password,8);


        const user = usersRepository.create({
            email,
            name,
            password: hashedPassword
        })
        await usersRepository.save(user)
        return user
    }
}

export default CreateUserService