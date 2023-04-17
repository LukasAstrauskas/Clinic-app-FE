import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PhyNameOccupation } from '../../../model/Model';
import { RootState } from '../../types';

interface PhyNameOccupationState {
  physicians: PhyNameOccupation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  physicianId: string | null;
}
const initialState: PhyNameOccupationState = {
  physicians: [],
  status: 'idle',
  error: null,
  physicianId: null,
};

export const fetchPhyNameOccupation = createAsyncThunk<PhyNameOccupation[]>(
  'phyNameOccupation/fetchPhyNameOccupation',
  async () => {
    const response = await axios.get<PhyNameOccupation[]>(
      'http://localhost:8080/physicianNamesOccupations',
    );
    return response.data;
  },
);

export const phyNameOccupationSlice = createSlice({
  name: 'phyNameOccupation',
  initialState,
  reducers: {
    setPhysicianId: (state, action: PayloadAction<string>) => {
      state.physicianId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhyNameOccupation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhyNameOccupation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.physicians = action.payload;
        state.physicianId = action.payload[0].physicianId;
      })
      .addCase(fetchPhyNameOccupation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export const { setPhysicianId } = phyNameOccupationSlice.actions;

export const selectPhyNameOccupation = (state: RootState) =>
  state.phyNameOccupation;

export const selectPhysicians = (state: RootState) =>
  selectPhyNameOccupation(state).physicians;

export const selectPhysicianId = (state: RootState) =>
  selectPhyNameOccupation(state).physicianId;

export const selectPhysicianById = (state: RootState, physicianId: string) => {
  const physicians = selectPhysicians(state);
  return physicians.find((physician) => physician.physicianId === physicianId);
};

export default phyNameOccupationSlice.reducer;
