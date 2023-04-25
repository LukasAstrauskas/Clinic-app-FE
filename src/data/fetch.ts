import axios from 'axios';
import { Appointment, Timeslot } from '../model/Model';

export const deleteTimeslot = async (timeslot: Timeslot): Promise<void> => {
  const { physicianId, date, time } = timeslot;
  await axios.delete('http://localhost:8080/timeslot', {
    data: {
      physicianId: physicianId,
      date: date,
      time: time,
    },
  });
};

export const updateTimeslot = async (
  appointment: Appointment,
): Promise<void> => {
  await axios
    .patch('http://localhost:8080/timeslot', appointment)
    .catch((error) => {
      console.error('There was an error!', error);
    });
};
