import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import { BASE_PATIENTS_URL, PATIENTS_URL } from '../../../utils/httpConstants';

interface PatientsState {
  patients: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
  isLoading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async () => {
    const response = await fetch(PATIENTS_URL);
    const data = await response.json();
    return data;
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
      });
  },
});

export default patientSlice.reducer;
