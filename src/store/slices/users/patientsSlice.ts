import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import { Status } from '../../../utils/Status';

import { PATIENT } from '../../../utils/Users';
import axios from 'axios';
import { BASE_URL, USER } from '../../../utils/httpConstants';
import { bearerToken } from '../../../authentication/authHeader';
import { RootState } from '../../reducers';

interface PatientState {
  patients: User[];
  size: number;
  status: Status.IDLE | Status.PENDING | Status.SUCCEEDED | Status.FAILED;
  error: string | null;
}

const patients: User[] = JSON.parse(localStorage.getItem('patients') || '[]');

const initialState: PatientState = {
  patients: patients,
  size: 0,
  status: Status.IDLE,
  error: null,
};

export const getPatients = createAsyncThunk(
  'user/getPatients',
  async ({
    offset = 0,
    userType = PATIENT,
  }: {
    offset?: number;
    userType?: string;
  }) => {
    const responce = await axios.get(
      ` ${BASE_URL}${USER}?offset=${offset}&userType=${userType}`,
      { headers: bearerToken() },
    );
    return responce.data;
  },
);

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.patients = [...state.patients, ...action.payload];
      state.status = Status.SUCCEEDED;
      localStorage.setItem('patients', JSON.stringify(action.payload));
    });
  },
});

export const selectPatients = (state: RootState) => state.patients.patients;
