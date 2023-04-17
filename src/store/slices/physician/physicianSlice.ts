import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../model/Model';

interface PhysicianState {
  physicians: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PhysicianState = {
  physicians: [],
  isLoading: false,
  error: null,
};

export const fetchPhysicians = createAsyncThunk(
  'user/fetchPhysicians',
  async () => {
    const response = await fetch('http://localhost:8080/user/physicians');
    const data = await response.json();
    return data;
  },
);

export const deletePhysician = createAsyncThunk(
  'user/deletePhysician',
  async (id: string) => {
    const response = await fetch(
      `http://localhost:8080/user/physicians/${id}`,
      {
        method: 'DELETE',
      },
    );
    const data = await response.json();
    return data;
  },
);

export const physicianSlice = createSlice({
  name: 'physician',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhysicians.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPhysicians.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.physicians = action.payload;
        },
      )
      .addCase(fetchPhysicians.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deletePhysician.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deletePhysician.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.physicians = state.physicians.filter(
            (physician) => physician.id !== action.payload.id,
          );
        },
      )
      .addCase(deletePhysician.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default physicianSlice.reducer;
