import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { Timeslot, Timeslots } from '../../../model/Model';
import { TIMESLOTS_URL } from '../../../utils/httpConstants';
import authHeader from '../../../authentication/authHeader';

type GetProps = {
  id: string;
  date: Dayjs;
};

export const getTimeslot = createAsyncThunk(
  'timeslot/getTimeslot',
  async ({ id, date }: GetProps) => {
    let timeslots: Timeslots[] = [];
    await axios
      .get<Timeslots[]>(
        `${TIMESLOTS_URL}/${id}?date=${date.format('YYYY-MM-DD')}`,
        {
          headers: authHeader(),
        },
      )
      .then((response) => {
        timeslots = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return timeslots;
  },
);

export const deleteTimeslot = createAsyncThunk(
  'timeslot/deleteTimeslot',
  async (timeslot: Timeslot) => {
    await axios
      .delete('http://localhost:8080/timeslot', {
        headers: authHeader(),
        data: timeslot,
      })
      .catch((error) => {
        console.error('Error deleting timeslot:', error);
      });
  },
);

export const deletePatientFromUpcomingTimeslot = createAsyncThunk(
  'timeslot/deletePatientFromUpcomingTimeslot',
  async ({
    physicianId,
    patientId,
  }: {
    physicianId: string;
    patientId: string;
  }) => {
    const config = {
      headers: authHeader(),
    };

    await axios
      .put(
        `http://localhost:8080/timeslot/removeExistingPatient/${physicianId}/${patientId}`,
        {},
        config,
      )
      .catch((error) => {
        console.error(
          'Error deleting existing patient from upcoming timeslot:',
          error,
        );
      });
  },
);

export const deletePatientFromTimeslot = createAsyncThunk(
  'timeslot/deletePatientFromTimeslot',
  async (timeslot: Timeslot) => {
    await axios
      .put('http://localhost:8080/timeslot/removePatient', timeslot, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.error('Error deleting patient from timeslot:', error);
        throw error;
      });
  },
);

export const postTimeslot = createAsyncThunk(
  'timeslot/ postTimeslot',
  async (timeslot: Timeslot) => {
    await axios
      .post('http://localhost:8080/timeslot', timeslot, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.error('Error posting timeslot:', error);
      });
  },
);
