import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Physician, PhysicianDto, User } from '../../../model/Model';
import {
  BASE_PHYSICIANS_FULL_URL,
  BASE_PHYSICIANS_URL,
  PHYSICIANS_FULL_URL,
  PHYSICIANS_URL,
} from '../../../utils/httpConstants';
import axios from 'axios';

interface PhysicianState {
  physicians: PhysicianDto[];
  selectedPhysician: PhysicianDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PhysicianState = {
  physicians: [],
  selectedPhysician: null,
  isLoading: false,
  error: null,
};

export const fetchPhysicians = createAsyncThunk(
  'physician/fetchPhysicians',
  async () => {
    const response = await fetch(PHYSICIANS_FULL_URL);
    const data = await response.json();
    return data;
  },
);

export const fetchPhysicianById = createAsyncThunk<PhysicianDto, string>(
  'physician/fetchPhysicianById',
  async (id) => {
    const response = await axios.get(`${BASE_PHYSICIANS_FULL_URL}${id}`);
    return response.data as PhysicianDto;
  },
);

export const updatePhysician = createAsyncThunk<PhysicianDto, PhysicianDto>(
  'physician/updatePhysician',
  async (physician) => {
    const response = await axios.put(
      `${BASE_PHYSICIANS_FULL_URL}${physician.id}`,
      physician,
    );
    return response.data as PhysicianDto;
  },
);

export const physicianDtoSlice = createSlice({
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
        (state, action: PayloadAction<PhysicianDto[]>) => {
          state.isLoading = false;
          state.physicians = action.payload;
        },
      )
      .addCase(fetchPhysicians.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })

      .addCase(fetchPhysicianById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPhysicianById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPhysician = action.payload;
      })
      .addCase(fetchPhysicianById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default physicianDtoSlice.reducer;
