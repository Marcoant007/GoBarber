import { response, Router } from 'express';
import { parseISO } from 'date-fns'

import DeleteAppointmentsService from '../services/Appointments/DeleteAppointmentService';
import ListAppointmentService from '../services/Appointments/ListAppointmentService';
import CreateAppointmentService from '../services/Appointments/CreateAppointmentService';
import UpdateAppointmentService from '../services/Appointments/UpdateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated) // coloco aqui para aplicar em todas as rotas


appointmentsRouter.get('/', async (request, response) => {
    const listAppointment = new ListAppointmentService();
    const appointments = await listAppointment.execute()
    return response.json(appointments);
});
appointmentsRouter.post('/', async (request, response) => {
    
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);
        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id: provider_id,
        });
        return response.json(appointment);
   
});
appointmentsRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const { date, provider_id } = request.body
    const updateappointment = new UpdateAppointmentService();
    const appointment = await updateappointment.execute(
        {
            id: id,
            provider_id: provider_id,
            date: date
        }
    );
    return response.json(appointment)
})
appointmentsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params
    const deleteappointment = new DeleteAppointmentsService()
    await deleteappointment.execute({ id })
    return response.status(204).send({})
})
export default appointmentsRouter;
