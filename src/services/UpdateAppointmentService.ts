import { getCustomRepository } from 'typeorm'
import User from '../models/User';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    id: string;
    provider_id: string;
    date: Date;
}
class UpdateAppointmentService {
    public async execute({ id, date, provider_id }: Request) {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)
        const appointmentUpdated = await appointmentsRepository.save({
            id,
            date,
            provider_id
        })
        return appointmentUpdated;
    }
}
export default UpdateAppointmentService

