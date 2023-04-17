import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';

interface AdminState {
  admins: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admins: [],
  isLoading: false,
  error: null,
};

export const fetchAdmins = createAsyncThunk('user/fetchAdmins', async () => {
  const response = await fetch('http://localhost:8080/user/admins');
  const data = await response.json();
  return data;
});

export const deleteAdmin = createAsyncThunk(
  'user/deleteAdmin',
  async (id: string) => {
    const response = await fetch(`http://localhost:8080/user/admins/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAdmins.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.admins = action.payload;
        },
      )
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload.id,
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default adminSlice.reducer;
