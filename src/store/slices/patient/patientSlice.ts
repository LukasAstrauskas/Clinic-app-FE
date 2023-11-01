import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PatientAppointment, User, PatientInfo } from '../../../model/Model';
import {
  BASE_PATIENTS_URL,
  INCOMING_PATIENTS_TO_BE_RENDERED_URL,
  PATIENTS_ADDITIONAL_INFO_URL,
  PATIENTS_URL,
  PATIENT_APPOINTMENTS,
  PATIENT_PAST_APPOINTMENTS,
  PATIENT_PAST_APPOINTMENTS_AMOUNT,
  PATIENT_SEARCH_URL,
} from '../../../utils/httpConstants';
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

export const fetchUpcomingPatientAppointments = createAsyncThunk(
  'patients/patient-appointments',
  async (id: string | null) => {
    const response = await axios.get(PATIENT_APPOINTMENTS + id, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const fetchPatientPastAppointments = createAsyncThunk(
  'patients/patient-past-appointments',
  async ({ id, offset }: { id: string; offset: number }) => {
    const response = await axios.get(
      `${PATIENT_PAST_APPOINTMENTS}${id}/${offset}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  },
);

export const fetchPatientPastAppointmentAmount = createAsyncThunk(
  'patients/patient-more-past-appointments',
  async (id: string) => {
    const response = await axios.get(
      PATIENT_PAST_APPOINTMENTS_AMOUNT.concat(`/${id}`),
      {
        headers: authHeader(),
      },
    );
    console.log(response.data);
    return response.data;
  },
);

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async () => {
    const response = await axios.get(PATIENTS_URL, {
      headers: authHeader(),
    });

    return response.data;
  },
);

export const resetPatientData = createAsyncThunk(
  'patient/reset-store',
  async () => {
    return [];
  },
);

export const fetchMorePatients = createAsyncThunk(
  'patients/fetchMorePatients',
  async (offset: number) => {
    const response = await axios.get<User[]>(
      INCOMING_PATIENTS_TO_BE_RENDERED_URL + offset,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  },
);

export const fetchPatientsByPhysicianId = createAsyncThunk(
  'patients/fetchPatientsByPhysicianId',
  async ({ id }: { id: string | null }) => {
    const response = await axios.get<User[]>(BASE_PATIENTS_URL + id + '/' + 0, {
      headers: authHeader(),
    });

    return response.data;
  },
);

export const fetchMorePatientsByPhysicianId = createAsyncThunk(
  'patients/fetchMorePatientsByPhysicianId',
  async ({ id, offset }: { id: string | null; offset: number | undefined }) => {
    const response = await axios.get<User[]>(
      BASE_PATIENTS_URL + id + '/' + offset,
      {
        headers: authHeader(),
      },
    );

    return response.data;
  },
);

export const searchPatient = createAsyncThunk(
  'patients/searchPatient',
  async (search: string) => {
    const response = await axios.get(PATIENT_SEARCH_URL + search, {
      headers: authHeader(),
    });
    return response.data;
  },
);

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
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchMorePatients.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMorePatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = [...state.patients, ...action.payload];
      })
      .addCase(fetchMorePatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPatientsByPhysicianId.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchPatientsByPhysicianId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatientsByPhysicianId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchMorePatientsByPhysicianId.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMorePatientsByPhysicianId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = [...state.patients, ...action.payload];
      })
      .addCase(fetchMorePatientsByPhysicianId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
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
      .addCase(fetchUpcomingPatientAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingPatientAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingAppointments = action.payload;
      })
      .addCase(fetchUpcomingPatientAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPatientPastAppointmentAmount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatientPastAppointmentAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.pastAppointments = action.payload.data;
        state.totalPastAppointmentAmount = action.payload;
      })
      .addCase(fetchPatientPastAppointmentAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPatientPastAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatientPastAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pastAppointments = [...state.pastAppointments, ...action.payload];
      })
      .addCase(fetchPatientPastAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
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
      })
      .addCase(resetPatientData.fulfilled, (state, action) => {
        state.patients = action.payload;
      });
  },
});

export const selectPatients = (state: RootState) => state.patient.patients;
export const selectPatientAdditionalInfo = (state: RootState) =>
  state.patient.additionalInfo;
export const selectUpcomingAppointments = (state: RootState) =>
  state.patient.upcomingAppointments;
export const selectPastAppointments = (state: RootState) =>
  state.patient.pastAppointments;
export const selectTotalPastAppointmentAmount = (state: RootState) =>
  state.patient.totalPastAppointmentAmount;

export default patientSlice.reducer;
