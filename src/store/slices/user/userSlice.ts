import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../types';
import { CreateUserDTO, User } from '../../../model/Model';
import { ADMIN_ACTION, BASE_USER_URL } from '../../../utils/httpConstants';
import authHeader from '../../../authentication/authHeader';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserById = createAsyncThunk<User, string>(
  'user/fetchById',
  async (id) => {
    const response = await axios.get(`${BASE_USER_URL}${id}`, {
      headers: authHeader(),
    });
    return response.data as User;
  },
);
export const createUser = createAsyncThunk(
  'patients/createPatient',
  async (createUserDTO: CreateUserDTO) => {
    const response = await axios.post(`${ADMIN_ACTION}`, createUserDTO, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const updateUser = createAsyncThunk<User, User>(
  'user/update',
  async (user) => {
    const response = await axios.put(`${BASE_USER_URL}${user.id}`, user, {
      headers: authHeader(),
    });
    return response.data as User;
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteAdmin',
  async (id: string) => {
    const response = await axios.delete(`${ADMIN_ACTION}/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch user';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to update user';
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete user';
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectUserName = (state: RootState) => state.user.user?.name || '';
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
