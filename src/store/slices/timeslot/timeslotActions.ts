import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import {
  GroupedTimeslots,
  PatientAppointment,
  Timeslot,
} from '../../../model/Model';
import {
  BASE_URL,
  CANCEL_APPOINTMENT,
  GET_TIMESLOTS,
  TIMESLOT,
} from '../../../utils/httpConstants';
import authHeader, { bearerToken } from '../../../authentication/authHeader';
import { store } from '../../store';
import { useAppDispatch } from '../../hooks';
import { addAppointment, logout } from '../loggedUser/loggedUserSlice';

type GetProps = {
  id: string;
  date: Dayjs;
};

export const getTimeslots = createAsyncThunk(
  'timeslot/getTimeslots',
  async ({ id, date }: GetProps) => {
    let timeslots: GroupedTimeslots[] = [];
    await axios
      .get(
        `${BASE_URL}${TIMESLOT}${GET_TIMESLOTS}/${id}?date=${date.format(
          'YYYY-MM-DD',
        )}`,
        {
          headers: bearerToken(),
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
  async (timeslotId: string) => {
    await axios
      .delete(`${BASE_URL}${TIMESLOT}?timeslotId=${timeslotId}`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.error('Error deleting timeslot:', error);
      });
  },
);

// REMOVE this thunk
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

export const cancelAppointment = createAsyncThunk(
  'timeslot/cancelAppointment',
  async (timeslotId: string) => {
    const config = {
      headers: bearerToken(),
    };
    const response = await axios.patch(
      BASE_URL.concat(TIMESLOT).concat(CANCEL_APPOINTMENT),
      { timeslotId },
      config,
    );
    return response.data;
  },
);

export const postTimeslot = createAsyncThunk(
  'timeslot/ postTimeslot',
  async (timeslot: Timeslot) => {
    await axios
      .post(`${BASE_URL}${TIMESLOT}`, timeslot, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.error('Error posting timeslot:', error);
      });
  },
);

export const patientBookTimeslot = createAsyncThunk(
  'timeslot/bookTimeslot',
  async (appointment: Timeslot) => {
    await axios
      .patch('http://localhost:8080/timeslot', appointment, {
        headers: authHeader(),
      })
      .then((resp) => {
        const appointment = resp.data as PatientAppointment;
        addAppointment(appointment);
      })
      .catch((error) => {
        throw new Error(
          `You already have an appointment with this physician: ${error.message}`,
        );
      });
  },
);
