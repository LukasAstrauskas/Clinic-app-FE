import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PATIENTS_ADDITIONAL_INFO_URL } from '../../../utils/httpConstants';
import { Patient } from '../../../model/Model';
import { RootState } from '../../types';

interface PatientInfoState {
  additionalInfo: Patient | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientInfoState = {
  additionalInfo: null,
  isLoading: false,
  error: null,
};

export const fetchPatientInfo = createAsyncThunk(
  'patientInfo/fetchPatientInfo',
  async (id: string) => {
    const response = await axios.get(`${PATIENTS_ADDITIONAL_INFO_URL}${id}`);
    return response.data as Patient;
  },
);

export const patientInfoSlice = createSlice({
  name: 'patientInfo',
  initialState,
  reducers: {
    updatePatientInfo(state, action: PayloadAction<Partial<Patient>>) {
      if (state.additionalInfo) {
        state.additionalInfo = { ...state.additionalInfo, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatientInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.additionalInfo = action.payload;
      })
      .addCase(fetchPatientInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectAdditionalInfo = (state: RootState) =>
  state.patientInfo.additionalInfo;

export default patientInfoSlice.reducer;
