import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UniversalUser, User, endPoint } from '../../../model/Model';
import { RootState } from '../../types';
import axios from 'axios';
import { BASE_PATIENTS_URL, PATIENTS_URL } from '../../../utils/httpConstants';

interface PatientsState {
  patients: User[];
  toRenderPatients: UniversalUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
  toRenderPatients: [],
  isLoading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk<User[]>(
  'patients/fetchPatients',
  async () => {
    const response = await axios.get<User[]>(PATIENTS_URL);
    return response.data;
  },
);

export const fetchMorePatients = createAsyncThunk(
  'patients/fetchMorePatients',
  async (offset: number) => {
    const response = await axios.get<UniversalUser[]>(
      `http://localhost:8080/user/patients/limit/${offset}`,
    );
    return response.data;
  },
);

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id: number) => {
    const response = await fetch(`${BASE_PATIENTS_URL}${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
);

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPatients.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.patients = action.payload;
        },
      )
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deletePatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deletePatient.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.patients = state.patients.filter(
            (patient) => patient.id !== action.payload.id,
          );
        },
      )
      .addCase(deletePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchMorePatients.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchMorePatients.fulfilled,
        (state, action: PayloadAction<UniversalUser[]>) => {
          state.isLoading = false;
          state.toRenderPatients = action.payload;
        },
      )
      .addCase(fetchMorePatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectPatients = (state: RootState) => state.patient.patients;

export const selectLimitedPatients = (state: RootState) =>
  state.patient.toRenderPatients;

export default patientSlice.reducer;
