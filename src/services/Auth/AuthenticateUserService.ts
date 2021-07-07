import { compare } from "bcrypt";
import { getCustomRepository, getRepository } from "typeorm";
import User from "../../models/User";
import {sign, verify} from 'jsonwebtoken'
import auth from "../../config/auth";

class IAuth {
    email: string;
    password: string;
    
}
class IResponse{
    user: User;
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: IAuth): Promise<IResponse> {

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {email}});
        if(!user ){
            throw new Error('Incorrect email/password combination.');
        }
        //o compare vai comparar a senha não criptografada com a senha criptgrafada
        const passwordMatched = await compare(password, user.password);
        if(!passwordMatched){
            throw new Error('Incorrect email/password combination.');
        }

        const { secret, expiresIn} = auth.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        return {user, token}
    }
}

export default AuthenticateUserService