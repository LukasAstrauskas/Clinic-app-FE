import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  PatientAppointments,
  UniversalUser,
  User,
  PatientInfo,
  CreateUserDto,
} from '../../../model/Model';
import {
  BASE_PATIENTS_URL,
  BASE_USER_URL,
  INCOMING_PATIENTS_TO_BE_RENDERED_URL,
  PATIENTS_ADDITIONAL_INFO_URL,
  PATIENTS_URL,
  PATIENT_APPOINTMENTS,
  PATIENT_PAST_APPOINTMENTS,
  PATIENT_REMOVE_APPOINTMENT,
  PATIENT_SEARCH_URL,
} from '../../../utils/httpConstants';
import { RootState } from '../../types';
import authHeader from '../../../authentication/authHeader';

interface PatientsState {
  patients: UniversalUser[];
  additionalInfo: PatientInfo | null;
  isLoading: boolean;
  upcomingAppointments: PatientAppointments[];
  pastAppointments: PatientAppointments[];
  patientPastAppointmentAmount: number;
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
  additionalInfo: null,
  upcomingAppointments: [],
  pastAppointments: [],
  patientPastAppointmentAmount: 0,
  isLoading: false,
  error: null,
};

export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (requestData: CreateUserDto) => {
    const response = await axios.post(`${PATIENTS_URL}`, requestData, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const deleteAppointment = createAsyncThunk(
  'patients/patient-cancel-appointment',
  async ({
    PhysicianId,
    PatientId,
  }: {
    PhysicianId: string | undefined;
    PatientId: string | null;
  }) => {
    const response = await axios.delete(PATIENT_REMOVE_APPOINTMENT, {
      headers: authHeader(),
      data: {
        PhysicianId,
        PatientId,
      },
    });
    return response.data;
  },
);

export const fetchPatientAppointments = createAsyncThunk(
  'patients/patient-appointments',
  async (id: string | null) => {
    const response = await axios.get(PATIENT_APPOINTMENTS + id, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const fetchMorePastPatientAppointments = createAsyncThunk(
  'patients/patient-past-appointments',
  async ({ id, offset }: { id: string | null; offset: number | undefined }) => {
    const response = await axios.get(
      `${PATIENT_PAST_APPOINTMENTS}${id}/${offset}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  },
);

export const fetchPastPatientAppointments = createAsyncThunk(
  'patients/patient-more-past-appointments',
  async (id: string | null) => {
    const response = await axios.get(PATIENT_PAST_APPOINTMENTS + id + '/' + 0, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const fetchPatients = createAsyncThunk<User[]>(
  'patients/fetchPatients',
  async () => {
    const response = await axios.get<User[]>(PATIENTS_URL, {
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
    const response = await axios.get<UniversalUser[]>(
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

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id: string) => {
    const response = await axios.delete<UniversalUser[]>(BASE_USER_URL + id, {
      headers: authHeader(),
    });
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
      .addCase(createPatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createPatient.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.patients.push(action.payload);
        },
      )
      .addCase(createPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
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
      .addCase(deleteAppointment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPastPatientAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPastPatientAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pastAppointments = action.payload.data;
        state.patientPastAppointmentAmount = action.payload.total;
      })
      .addCase(fetchPastPatientAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchMorePastPatientAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMorePastPatientAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pastAppointments = [
          ...state.pastAppointments,
          ...action.payload.data,
        ];
      })
      .addCase(fetchMorePastPatientAppointments.rejected, (state, action) => {
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
export const selectAppointments = (state: RootState) =>
  state.patient.upcomingAppointments;
export const selectPastAppointments = (state: RootState) =>
  state.patient.pastAppointments;
export const selectPatientPastAppointmentAmount = (state: RootState) =>
  state.patient.patientPastAppointmentAmount;

export default patientSlice.reducer;
