import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import { Status } from '../../../utils/Status';
import { ADMIN } from '../../../utils/Users';
import { getUsers } from './userActions';
import { RootState } from '../../reducers';

interface AdminsState {
  admins: User[];
  search: string;
  adminId: string;
  status: Status.IDLE | Status.PENDING | Status.SUCCEEDED | Status.FAILED;
  error: string | null;
}

const admins: User[] = JSON.parse(localStorage.getItem('admins') || '[]');
const search: string = JSON.parse(localStorage.getItem('adminSearch') || `""`);

const adminId: string = JSON.parse(localStorage.getItem('adminId') || `""`);

const initialState: AdminsState = {
  admins: admins,
  search: search,
  adminId: adminId,
  status: Status.IDLE,
  error: null,
};

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    clearAdmins(state) {
      state.admins = [];
      localStorage.setItem('admins', JSON.stringify(state.admins));
    },
    setAdminsSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      localStorage.setItem('adminSearch', JSON.stringify(state.search));
    },
    setAdminID(state, action: PayloadAction<string>) {
      state.adminId = action.payload;
      localStorage.setItem('adminId', JSON.stringify(state.adminId));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const users = action.payload;
      if (users.length > 0 && users[0].type === ADMIN) {
        if (state.admins.length === 0) {
          state.adminId = users[0].id;
        }
        state.admins = [...state.admins, ...users];
        state.status = Status.SUCCEEDED;
        localStorage.setItem('admins', JSON.stringify(state.admins));
      }
    });
  },
});

export const { clearAdmins, setAdminsSearch, setAdminID } = adminsSlice.actions;

export const selectAdmins = (state: RootState) => state.admins.admins;
export const selectAdminSearch = (state: RootState) => state.admins.search;
export const selectAdminId = (state: RootState) => state.admins.adminId;
