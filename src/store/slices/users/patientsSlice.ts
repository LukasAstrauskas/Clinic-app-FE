import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import { Status } from '../../../utils/Status';
import { PATIENT } from '../../../utils/Users';
import { RootState } from '../../reducers';
import { deleteUser, getUsers } from './userActions';

interface PatientState {
  patients: User[];
  patientId: string;
  search: string;
  status: Status.IDLE | Status.PENDING | Status.SUCCEEDED | Status.FAILED;
  error: string | null;
}

const patients: User[] = JSON.parse(localStorage.getItem('patients') || '[]');
const search: string = JSON.parse(
  localStorage.getItem('patientSearch') || `""`,
);

const initialState: PatientState = {
  patients: patients,
  patientId: '',
  search: search,
  status: Status.IDLE,
  error: null,
};

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
    setPatientId(state, action: PayloadAction<string>) {
      state.patientId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const users = action.payload;
      if (users.length > 0 && users[0].type === PATIENT) {
        state.patients = [...state.patients, ...users];
        state.status = Status.SUCCEEDED;
        localStorage.setItem('patients', JSON.stringify(state.patients));
      }
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const { id, type } = action.payload;
      if (type === PATIENT) {
        const filtered = state.patients.filter((patient) => patient.id !== id);
        state.patients = filtered;
        state.status = Status.SUCCEEDED;
        localStorage.setItem('patients', JSON.stringify(state.patients));
      }
    });
  },
});

export const { clearPatients, setPatientSearch, setPatientId } =
  patientsSlice.actions;
export const selectPatients = (state: RootState) => state.patients.patients;
export const selectPatientSearch = (state: RootState) => state.patients.search;
export const selectPatientId = (state: RootState) => state.patients.patientId;
export const patientsLength = (state: RootState) =>
  state.patients.patients.length;
