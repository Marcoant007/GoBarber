import { startOfHour } from 'date-fns';
import { response } from 'express';
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request {
    id: string;
    provider: string;
    date: Date;
}

class UpdateAppointmentService {
    public async execute({ id, date, provider }: Request) {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)


        console.log("oque tem aqui:", id, date, provider);


        const appointmentUpdated = await appointmentsRepository.save({
            id,
            date,
            provider
        })



        return appointmentUpdated;

    }
}


export default UpdateAppointmentService

