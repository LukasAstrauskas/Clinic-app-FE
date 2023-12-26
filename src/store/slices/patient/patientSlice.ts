import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PatientAppointment, User, PatientInfo } from '../../../model/Model';
import { PATIENTS_ADDITIONAL_INFO_URL } from '../../../utils/httpConstants';
import { RootState } from '../../reducers';
import authHeader from '../../../authentication/authHeader';

interface PatientsState {
  patients: User[];
  additionalInfo: PatientInfo | null;
  isLoading: boolean;
  upcomingAppointments: PatientAppointment[];
  pastAppointments: PatientAppointment[];
  totalPastAppointmentAmount: number;
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
  additionalInfo: null,
  upcomingAppointments: [],
  pastAppointments: [],
  totalPastAppointmentAmount: 0,
  isLoading: false,
  error: null,
};

export const fetchPatientInfo = createAsyncThunk(
  'patientInfo/fetchPatientInfo',
  async (id: string) => {
    const response = await axios.get(`${PATIENTS_ADDITIONAL_INFO_URL}${id}`, {
      headers: authHeader(),
    });

    sessionStorage.setItem('gender', response.data.gender);
    sessionStorage.setItem('birthDate', response.data.birthDate);
    sessionStorage.setItem('phone', response.data.phone);
    sessionStorage.setItem('street', response.data.street);
    sessionStorage.setItem('city', response.data.city);
    sessionStorage.setItem('postalCode', response.data.postalCode);
    sessionStorage.setItem('country', response.data.country);
    sessionStorage.setItem('emergencyName', response.data.emergencyName);
    sessionStorage.setItem(
      'emergencyLastName',
      response.data.emergencyLastName,
    );
    sessionStorage.setItem('emergencyPhone', response.data.emergencyPhone);
    sessionStorage.setItem(
      'emergencyRelation',
      response.data.emergencyRelation,
    );

    return response.data as PatientInfo;
  },
);

export const updatePatientInfo = createAsyncThunk(
  'patientInfo/updatePatientInfo',
  async (updatedPatientInfo: PatientInfo) => {
    try {
      const response = await axios.put(
        `${PATIENTS_ADDITIONAL_INFO_URL}${updatedPatientInfo.userId}`,
        updatedPatientInfo,
        {
          headers: authHeader(),
        },
      );
      sessionStorage.setItem('gender', response.data.gender);
      sessionStorage.setItem('birthDate', response.data.birthDate);
      sessionStorage.setItem('phone', response.data.phone);
      sessionStorage.setItem('street', response.data.street);
      sessionStorage.setItem('city', response.data.city);
      sessionStorage.setItem('postalCode', response.data.postalCode);
      sessionStorage.setItem('country', response.data.country);
      sessionStorage.setItem('emergencyName', response.data.emergencyName);
      sessionStorage.setItem(
        'emergencyLastName',
        response.data.emergencyLastName,
      );
      sessionStorage.setItem('emergencyPhone', response.data.emergencyPhone);
      sessionStorage.setItem(
        'emergencyRelation',
        response.data.emergencyRelation,
      );
      return response.data as PatientInfo;
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.response?.status == 404) {
        //if the row with data in additionalPatientInfo table doesn't exist
        const response = await axios.post(
          `${PATIENTS_ADDITIONAL_INFO_URL}`,
          updatedPatientInfo,
          {
            headers: authHeader(),
          },
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
      {
        headers: authHeader(),
      },
    );
    return response.data as PatientInfo;
  },
);

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
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
        state.additionalInfo = null;
        state.error =
          action.error.message || 'This patient has no aditional information';
      })
      .addCase(updatePatientInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.additionalInfo = action.payload;
      });
  },
});

export const selectPatientAdditionalInfo = (state: RootState) =>
  state.patient.additionalInfo;

export default patientSlice.reducer;
