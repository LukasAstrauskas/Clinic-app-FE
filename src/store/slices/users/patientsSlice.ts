import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import { Status } from '../../../utils/Status';

import { PATIENT } from '../../../utils/Users';
import axios from 'axios';
import { BASE_URL, SEARCH, USER } from '../../../utils/httpConstants';
import { bearerToken } from '../../../authentication/authHeader';
import { RootState } from '../../reducers';
import { getUsers } from './userActions';

interface Params {
  search: string;
  occupationId: string | null;
  userType: string;
}

const initialParams: Params = {
  search: '',
  userType: PATIENT,
  occupationId: null,
};

interface PatientState {
  patients: User[];
  search: string;
  status: Status.IDLE | Status.PENDING | Status.SUCCEEDED | Status.FAILED;
  error: string | null;
}

const patients: User[] = JSON.parse(localStorage.getItem('patients') || '[]');
const search: string = JSON.parse(localStorage.getItem('patientSearch') || '');

const initialState: PatientState = {
  patients: patients,
  search: search,
  status: Status.IDLE,
  error: null,
};

// export const getUsers = createAsyncThunk(
//   'user/getPatients',
//   async ({
//     offset = 0,
//     search = '',
//     occupationId,
//     userType,
//   }: {
//     offset?: number;
//     search?: string;
//     occupationId?: string;
//     userType: string;
//   }) => {
//     const params = new URLSearchParams();
//     params.append('search', search);
//     params.append('offset', offset.toString());
//     params.append('userType', userType);
//     if (occupationId) params.append('occupatioinId', occupationId);
//     console.log(`${BASE_URL}${USER}?${params}`);
//     const responce = await axios.get<User[]>(`${BASE_URL}${USER}?${params}`, {
//       headers: bearerToken(),
//     });
//     return responce.data;
//   },
// );

interface SearchProps {
  search: string | null;
  occupationId?: string;
  type?: string;
}

export const patientSearch = createAsyncThunk(
  'user/patientSearch',
  async ({ search = '', occupationId }: SearchProps) => {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search);
    }
    if (occupationId) {
      params.append(' occupationId', occupationId);
    }
    params.append('type', PATIENT);
    const resp = await axios.get<User[]>(
      `${BASE_URL}${USER}${SEARCH}?${params}`,
      {
        headers: bearerToken(),
      },
    );
    console.log('Length ' + resp.data.length);
    return resp.data;
  },
);

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearPatients(state) {
      state.patients = [];
      localStorage.setItem('patients', JSON.stringify(state.patients));
      console.log('Length clr ' + state.patients.length);
    },
    setPatientSearch(state, action: PayloadAction<string>) {
      console.log(`pat search: ${action.payload}`);
      state.search = action.payload;
      localStorage.setItem('patientSearch', JSON.stringify(state.search));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const users = action.payload;
      if (users.length > 0 && users[0].type === PATIENT) {
        console.log(`I've got ${PATIENT}s.`);
      }
      state.patients = [...state.patients, ...users];
      state.status = Status.SUCCEEDED;
      localStorage.setItem('patients', JSON.stringify(state.patients));
    });
    builder.addCase(patientSearch.fulfilled, (state, action) => {
      state.patients = [...state.patients, ...action.payload];
      state.status = Status.SUCCEEDED;
      localStorage.setItem('patients', JSON.stringify(state.patients));
    });
  },
});

export const { clearPatients, setPatientSearch } = patientsSlice.actions;
export const selectPatients = (state: RootState) => state.patients.patients;
export const selectPatientSearch = (state: RootState) => state.patients.search;
export const patientsLength = (state: RootState) =>
  state.patients.patients.length;
