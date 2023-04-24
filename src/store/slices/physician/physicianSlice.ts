import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Physician, User } from '../../../model/Model';
import {
  BASE_PHYSICIANS_FULL_URL,
  BASE_PHYSICIANS_URL,
  PHYSICIANS_URL,
} from '../../../utils/httpConstants';
import axios from 'axios';
import { RootState } from '../../types';

interface PhysicianState {
  physicians: Physician[];
  selectedPhysician: Physician | null;
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
  'user/fetchPhysicians',
  async () => {
    const response = await fetch(PHYSICIANS_URL);
    const data = await response.json();
    return data;
  },
);

export const fetchPhysicianById = createAsyncThunk<Physician, string>(
  'physician/fetchPhysicianById',
  async (id) => {
    const response = await axios.get(`${BASE_PHYSICIANS_URL}${id}`);
    return response.data as Physician;
  },
);

export const updatePhysician = createAsyncThunk<Physician, Physician>(
  'physician/update',
  async (physician) => {
    const response = await axios.put(
      `${BASE_PHYSICIANS_FULL_URL}${physician.id}`,
      physician,
    );
    return response.data as Physician;
  },
);

export const deletePhysician = createAsyncThunk(
  'user/deletePhysician',
  async (id: string) => {
    const response = await fetch(`${BASE_PHYSICIANS_URL}${id}`, {
      method: 'DELETE',
    });
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
        (state, action: PayloadAction<Physician[]>) => {
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
      })

      .addCase(deletePhysician.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deletePhysician.fulfilled,
        (state, action: PayloadAction<Physician>) => {
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

export const selectPhysician = (state: RootState) =>
  state.physician.selectedPhysician;

export default physicianSlice.reducer;
