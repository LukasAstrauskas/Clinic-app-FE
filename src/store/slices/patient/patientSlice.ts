import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UniversalUser, User } from '../../../model/Model';
import { RootState } from '../../types';
import axios from 'axios';
import {
  BASE_PATIENTS_URL,
  BASE_USER_URL,
  INCOMING_PATIENTS_TO_BE_RENDERED_URL,
  PATIENTS_URL,
  PATIENT_SEARCH_URL,
} from '../../../utils/httpConstants';

interface PatientsState {
  patients: UniversalUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
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
      INCOMING_PATIENTS_TO_BE_RENDERED_URL + offset,
    );
    return response.data;
  },
);

export const fetchPatientsByPhysicianId = createAsyncThunk(
  'patients/fetchPatientsByPhysicianId',
  async ({ id }: { id: string | null }) => {
    console.log('fetch');
    const response = await axios.get<User[]>(BASE_PATIENTS_URL + id + '/' + 0);

    return response.data;
  },
);

export const fetchMorePatientsByPhysicianId = createAsyncThunk(
  'patients/fetchMorePatientsByPhysicianId',
  async ({ id, offset }: { id: string | null; offset: number | undefined }) => {
    console.log('fetchmore');
    const response = await axios.get<User[]>(
      BASE_PATIENTS_URL + id + '/' + offset,
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
      .addCase(fetchPatientsByPhysicianId.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchPatientsByPhysicianId.fulfilled,
        (state, action: PayloadAction<UniversalUser[]>) => {
          state.isLoading = false;
          state.patients = action.payload;
        },
      )
      .addCase(fetchPatientsByPhysicianId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchMorePatientsByPhysicianId.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchMorePatientsByPhysicianId.fulfilled,
        (state, action: PayloadAction<UniversalUser[]>) => {
          state.isLoading = false;
          state.patients = [...state.patients, ...action.payload];
        },
      )
      .addCase(fetchMorePatientsByPhysicianId.rejected, (state, action) => {
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
      });
  },
});

export const selectPatients = (state: RootState) => state.patient.patients;

export default patientSlice.reducer;
