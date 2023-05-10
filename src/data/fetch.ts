import axios from 'axios';
import { TimeslotWithPhysicianAndPatient } from '../model/Model';

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
