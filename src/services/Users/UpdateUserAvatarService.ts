import { getCustomRepository, getRepository } from "typeorm";
import User from "../../models/User";
import path from 'path';
import uploadConfig from "../../config/upload";
import fs from 'fs'


interface IRequest {
    user_id: string;
    avatarFileName: string;
}



class UpdateUserAvatarService {
    public async execute({user_id, avatarFileName}:IRequest):Promise<User> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);
        if(!user){
            throw new Error('Only authenticated users can change avatar.')
        }

        if(user.avatar){
            //Deleta avatar anterior 
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)//tras uum status de um arquivo se ele existir
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        await userRepository.save(user);
        return user
    } 
}

export default UpdateUserAvatarService