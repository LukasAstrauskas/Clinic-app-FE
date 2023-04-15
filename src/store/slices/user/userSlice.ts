import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';
import axios from 'axios';

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

export async function getUserById(id: string): Promise<User> {
  const response = await axios.get<User>(`/api/users/${id}`);
  return response.data;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserByIdSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.data = action.payload;
    },
    getUserByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserByIdStart, getUserByIdSuccess, getUserByIdFailure } =
  userSlice.actions;
export default userSlice.reducer;
