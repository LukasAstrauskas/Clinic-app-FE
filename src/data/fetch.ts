import axios from 'axios';
import {
  Appointment,
  Timeslot,
  TimeslotWithPhysicianAndPatient,
} from '../model/Model';

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

export const removePatientFromTimeslot = async (
  timeslot: TimeslotWithPhysicianAndPatient,
): Promise<void> => {
  const { physicianId, patientId } = timeslot;
  await axios
    .patch(`http://localhost:8080/timeslot/${physicianId}/${patientId}`)
    .catch((error) => {
      console.error('Error removing patient from timeslot:', error);
    });
};

export const updateTimeslot = async (
  appointment: Appointment,
): Promise<void> => {
  await axios
    .patch('http://localhost:8080/timeslot', appointment)
    .catch((error) => {
      console.error('Error deleting timeslot:', error);
    });
};

export const countUpcomingTimeslotsWithPhysician = async (
  timeslot: TimeslotWithPhysicianAndPatient,
): Promise<number> => {
  const { physicianId, patientId } = timeslot;
  const response = await axios.get(
    `http://localhost:8080/timeslot/count/${physicianId}/${patientId}`,
  );
  return response.data;
};
