import { request, response, Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserService from "../services/Users/CreateUsersService";
import uploadConfig from "../config/upload";
import multer from "multer";
import UpdateUserAvatarService from "../services/Users/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUserService = new CreateUserService()
        const createdUser = await createUserService.execute({
            email,
            name,
            password
        })

        delete createdUser.password
        return response.status(200).json(createdUser)

    } catch (err) {
        return response.status(400).json({ error: err.message })

    }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    try {
        const updateUserAvatar = new UpdateUserAvatarService();
        const user = await updateUserAvatar.execute({
            user_id: request.user_id,
            avatarFileName: request.file.filename
        });
        delete user.password
        return response.json(user)
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

export default usersRouter