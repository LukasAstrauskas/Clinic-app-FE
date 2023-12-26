import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import { Status } from '../../../utils/Status';
import { PHYSICIAN } from '../../../utils/Users';
import { deleteUser, getUsers, updateUser } from './userActions';
import { RootState } from '../../reducers';

interface PhysiciansState {
  physicians: User[];
  search: string;
  occupationId: string;
  physicianId: string;
  status: Status.IDLE | Status.PENDING | Status.SUCCEEDED | Status.FAILED;
  error: string | null;
}

const physicians: User[] = JSON.parse(
  localStorage.getItem('physicians') || '[]',
);
const search: string = JSON.parse(
  localStorage.getItem('physicianSearch') || `""`,
);

const physicianId: string = JSON.parse(
  localStorage.getItem('physicianId') || `""`,
);

const occupationId: string = JSON.parse(
  localStorage.getItem('occupationId') || `""`,
);

const initialState: PhysiciansState = {
  physicians: physicians,
  search: search,
  occupationId: occupationId,
  physicianId: physicianId,
  status: Status.IDLE,
  error: null,
};

export const physiciansSlice = createSlice({
  name: 'physicians',
  initialState,
  reducers: {
    clearPhysicians(state) {
      state.physicians = [];
      localStorage.setItem('physicians', JSON.stringify(state.physicians));
    },
    setPhysicianSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      localStorage.setItem('physicianSearch', JSON.stringify(state.search));
    },
    setOccupationSearch(state, action: PayloadAction<string>) {
      state.occupationId = action.payload;
      localStorage.setItem('occupationId', JSON.stringify(state.occupationId));
    },
    setPhysicianID(state, action: PayloadAction<string>) {
      state.physicianId = action.payload;
      localStorage.setItem('physicianId', JSON.stringify(state.physicianId));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const users = action.payload;
      if (users.length > 0 && users[0].type === PHYSICIAN) {
        if (state.physicians.length === 0) {
          state.physicianId = users[0].id;
        }
        state.physicians = [...state.physicians, ...users];
        state.status = Status.SUCCEEDED;
        localStorage.setItem('physicians', JSON.stringify(state.physicians));
      }
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const { id, type } = action.payload;
      if (type === PHYSICIAN) {
        state.physicians = state.physicians.filter(
          (physician) => physician.id !== id,
        );
        state.status = Status.SUCCEEDED;
        localStorage.setItem('physicians', JSON.stringify(state.physicians));
      }
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser: User = action.payload;
      const { id, type, name, surname, email, occupation } = updatedUser;
      if (type === PHYSICIAN) {
        const arrayUser: User[] = state.physicians.map((physician) => {
          if (physician.id === id) {
            physician = { ...physician, name, surname, email, occupation };
          }
          return physician;
        });
        state.physicians = arrayUser;
        state.status = Status.SUCCEEDED;
        localStorage.setItem('patients', JSON.stringify(state.physicians));
      }
    });
  },
});

export const {
  clearPhysicians,
  setPhysicianSearch,
  setPhysicianID,
  setOccupationSearch,
} = physiciansSlice.actions;

export const selectPhysicians = (state: RootState) =>
  state.physicians.physicians;
export const selectPhysicianSearch = (state: RootState) =>
  state.physicians.search;
export const selectOccupationId = (state: RootState) =>
  state.physicians.occupationId;
export const selectPhysicianId = (state: RootState) =>
  state.physicians.physicianId;

export const selectPhysician = (state: RootState) => {
  let physician: User = {
    id: '',
    name: 'Not',
    surname: 'Found',
    password: '',
    email: '',
    type: PHYSICIAN,
    occupation: null,
  };
  const user = state.physicians.physicians.find(({ id }) => id === physicianId);
  if (user) physician = user;
  return physician;
};
