import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PatientAppointments, UniversalUser, User } from '../../../model/Model';
import { RootState } from '../../types';
import axios from 'axios';
import {
  BASE_USER_URL,
  DELETE_TIMESLOT,
  INCOMING_PATIENTS_TO_BE_RENDERED_URL,
  PATIENTS_URL,
  PATIENT_APPOINTMENTS,
  PATIENT_PAST_APPOINTMENTS,
  PATIENT_REMOVE_APPOINTMENT,
  PATIENT_SEARCH_URL,
} from '../../../utils/httpConstants';

interface PatientsState {
  patients: UniversalUser[];
  isLoading: boolean;
  upcomingAppointments: PatientAppointments[];
  pastAppointments: PatientAppointments[];
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
  upcomingAppointments: [],
  pastAppointments: [],
  isLoading: false,
  error: null,
};

export const deleteAppointment = createAsyncThunk(
  'patients/patient-cancel-appointment',
  async (PhysicianAndPatientIds: string) => {
    const response = await axios.patch(
      PATIENT_REMOVE_APPOINTMENT + PhysicianAndPatientIds,
    );
    return response.data;
  },
);

export const fetchPatientAppointments = createAsyncThunk(
  'patients/patient-appointments',
  async (id: string | null) => {
    const response = await axios.get(PATIENT_APPOINTMENTS + id);
    return response.data;
  },
);

export const fetchPastPatientAppointments = createAsyncThunk(
  'patients/patient-past-appointments',
  async (id: string | null) => {
    const response = await axios.get(PATIENT_PAST_APPOINTMENTS + id);
    return response.data;
  },
);

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
      INCOMING_PATIENTS_TO_BE_RENDERED_URL + offset,
    );
    return response.data;
  },
);

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id: string) => {
    const response = await axios.delete<UniversalUser[]>(BASE_USER_URL + id);
    return response.data;
  },
);

export const searchPatient = createAsyncThunk(
  'patients/searchPatient',
  async (search: string) => {
    const response = await axios.get(PATIENT_SEARCH_URL + search);
    return response.data;
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
      .addCase(fetchMorePatients.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchMorePatients.fulfilled,
        (state, action: PayloadAction<UniversalUser[]>) => {
          state.isLoading = false;
          state.patients = [...state.patients, ...action.payload];
        },
      )
      .addCase(fetchMorePatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deletePatient.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(searchPatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(searchPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPatientAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingAppointments = action.payload;
      })
      .addCase(fetchPatientAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPastPatientAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPastPatientAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pastAppointments = action.payload;
      })
      .addCase(fetchPastPatientAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteAppointment.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectPatients = (state: RootState) => state.patient.patients;
export const selectAppointments = (state: RootState) =>
  state.patient.upcomingAppointments;
export const selectPastAppointments = (state: RootState) =>
  state.patient.pastAppointments;

export default patientSlice.reducer;
