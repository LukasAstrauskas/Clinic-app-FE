import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PATIENTS_ADDITIONAL_INFO_URL } from '../../../utils/httpConstants';
import { PatientInfo } from '../../../model/Model';
import { RootState } from '../../types';

interface PatientInfoState {
  additionalInfo: PatientInfo | null;
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
    return response.data as PatientInfo;
  },
);

export const updatePatientInfo = createAsyncThunk(
  'patientInfo/updatePatientInfo',
  async (updatedPatientInfo: PatientInfo) => {
    try {
      const response = await axios.put(
        `${PATIENTS_ADDITIONAL_INFO_URL}${updatedPatientInfo.user_id}`,
        updatedPatientInfo,
      );
      console.log(response);
      return response.data as PatientInfo;
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.response?.status == 404) {
        //if the row with data in additionalPatientInfo table doesn't exist
        const response = await axios.post(
          `${PATIENTS_ADDITIONAL_INFO_URL}`,
          updatedPatientInfo,
        );
        return response.data as PatientInfo;
      }
      return null;
    }
  },
);

export const createPatientInfo = createAsyncThunk(
  'patientInfo/createPatientInfo',
  async (newPatientInfo: PatientInfo) => {
    const response = await axios.post(
      `${PATIENTS_ADDITIONAL_INFO_URL}`,
      newPatientInfo,
    );
    return response.data as PatientInfo;
  },
);

export const patientInfoSlice = createSlice({
  name: 'patientInfo',
  initialState,
  reducers: {
    updatePatientInfoState(state, action: PayloadAction<Partial<PatientInfo>>) {
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
      })
      .addCase(updatePatientInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.additionalInfo = action.payload;
      });
  },
});

export const selectAdditionalInfo = (state: RootState) =>
  state.patientInfo.additionalInfo;

export default patientInfoSlice.reducer;
