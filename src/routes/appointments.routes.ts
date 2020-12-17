import { response, Router } from 'express';
import { parseISO } from 'date-fns'
import CreateAppointmentService from '../services/CreateAppointmentService';
import ListAppointmentService from '../services/ListAppointmentService';
import UpdateAppointmentService from '../services/UpdateAppointmentService';
import DeleteAppointmentsService from '../services/DeleteAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const listAppointment = new ListAppointmentService();
    const appointments = await listAppointment.execute()
    return response.json(appointments);
});
appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;
        console.log(provider, date);
        const parsedDate = parseISO(date);
        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
});
appointmentsRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const { date, provider } = request.body
    const updateappointment = new UpdateAppointmentService();
    const appointment = await updateappointment.execute(
        {
            id: id,
            provider: provider,
            date: date
        }
    );
    console.log(date, provider);
    return response.json(appointment)
})
appointmentsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params
    const deleteappointment = new DeleteAppointmentsService()
    await deleteappointment.execute({ id })
    return response.status(204).send({})
})
export default appointmentsRouter;
