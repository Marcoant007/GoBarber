import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    id: string;
    provider: string;
    date: Date;
}
class UpdateAppointmentService {
    public async execute({ id, date, provider }: Request) {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)
        const appointmentUpdated = await appointmentsRepository.save({
            id,
            date,
            provider
        })
        return appointmentUpdated;
    }
}
export default UpdateAppointmentService

