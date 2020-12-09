import { startOfHour } from 'date-fns';
import { response } from 'express';
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    id: string;
}



class DeleteAppointmentsService {
    public async execute({ id }: Request) {


        const appointmentsRepository = getCustomRepository(AppointmentsRepository)
        await appointmentsRepository.delete({ id })

    }

}

export default DeleteAppointmentsService

//TESTE COMMIT 2
