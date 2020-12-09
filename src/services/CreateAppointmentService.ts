import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
interface Request {
    provider: string;
    date: Date;
}
class CreateAppointmentService {
    public async execute({ date, provider }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const appointmentCreate = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        })
        await appointmentsRepository.save(appointmentCreate)
        return appointmentCreate
    }
}
export default CreateAppointmentService;
