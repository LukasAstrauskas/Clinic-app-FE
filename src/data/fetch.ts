import axios from 'axios';
import { Timeslot } from '../model/Model';

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
