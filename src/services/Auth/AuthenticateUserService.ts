import { compare } from "bcrypt";
import { getCustomRepository, getRepository } from "typeorm";
import User from "../../models/User";


class IAuth {
    email: string;
    password: string;
}



class AuthenticateUserService {
    public async execute({ email, password }: IAuth): Promise<{user: User}> {

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
        return {user}
    }
}

export default AuthenticateUserService