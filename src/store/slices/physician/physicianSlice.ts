import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PhyNameOccupation } from '../../../model/Model';

interface PhysiciansState {
  physicians: PhyNameOccupation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  physicianId: string | null;
}

export const fetchPhysicians = createAsyncThunk<PhyNameOccupation[]>(
  'physicians/fetchPhysicians',
  async () => {
    const response = await axios.get<PhyNameOccupation[]>(
      'http://localhost:8080/physicianNamesOccupations',
    );
    return response.data;
  },
);

export const physiciansSlice = createSlice({
  name: 'physicians',
  initialState: {
    physicians: [],
    status: 'idle',
    error: null,
    physicianId: '',
  } as PhysiciansState,
  reducers: {
    setPhysicianId: (state, action: PayloadAction<string>) => {
      state.physicianId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhysicians.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhysicians.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.physicians = action.payload;
        state.physicianId = action.payload[0].physicianId; // set physicianId to the ID of the first physician
      })
      .addCase(fetchPhysicians.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export const { setPhysicianId } = physiciansSlice.actions;

export const selectPhysicians = (state: { physicians: PhysiciansState }) =>
  state.physicians.physicians;

export const selectPhysicianId = (state: { physicians: PhysiciansState }) =>
  state.physicians.physicianId;

export const selectPhysicianById = (
  state: { physicians: PhysiciansState },
  physicianId: string,
) => {
  const physicians = selectPhysicians(state);
  return physicians.find((physician) => physician.physicianId === physicianId);
};

export default physiciansSlice.reducer;
