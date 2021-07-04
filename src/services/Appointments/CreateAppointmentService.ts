import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'
import Appointment from '../../models/Appointment';
import AppointmentsRepository from '../../repositories/AppointmentsRepository';


interface IProvider {
    provider_id: string;
    date: Date;
}
class CreateAppointmentService {
    public async execute({ date, provider_id }: IProvider): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const appointmentCreate = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        })
        await appointmentsRepository.save(appointmentCreate)
        return appointmentCreate
    }
}
export default CreateAppointmentService;
