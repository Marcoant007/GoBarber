import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'


class ListAppointmentService {

    public async execute() {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointments = await appointmentsRepository.find()
        return appointments
    }

}

export default ListAppointmentService
