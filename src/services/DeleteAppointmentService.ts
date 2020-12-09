import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
interface Request {
    id: string;
}
class DeleteAppointmentsService {
    public async execute({ id }: Request) {
        const appointmentDeleted = getCustomRepository(AppointmentsRepository)
        await appointmentDeleted.delete({ id })
    }
}
export default DeleteAppointmentsService
