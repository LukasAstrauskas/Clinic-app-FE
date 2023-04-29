import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UniversalUser, User } from '../../../model/Model';
import {
  BASE_PHYSICIANS_URL,
  INCOMING_PHYSICIANS_TO_BE_RENDERED_URL,
  PHYSICIANS_URL,
  PHYSICIAN_SEARCH_URL,
} from '../../../utils/httpConstants';

import axios from 'axios';
import { RootState } from '../../reducers';

interface PhysicianState {
  physicians: UniversalUser[];
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
    const response = await axios.get<User[]>(PHYSICIANS_URL);
    return response.data;
  },
);

export const fetchMorePhysicians = createAsyncThunk(
  'user/fetchMorePhysicians',
  async (offset: number) => {
    const response = await axios.get<UniversalUser[]>(
      INCOMING_PHYSICIANS_TO_BE_RENDERED_URL + offset,
    );
    return response.data;
  },
);

export const deletePhysician = createAsyncThunk(
  'user/deletePhysician',
  async (id: string) => {
    const response = await axios.delete<UniversalUser[]>(
      BASE_PHYSICIANS_URL + id,
    );
    return response.data;
  },
);

export const searchPhysician = createAsyncThunk(
  'user/searchPhysician',
  async (search: string) => {
    const response = await axios.get(PHYSICIAN_SEARCH_URL + search);
    return response.data;
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
      .addCase(fetchMorePhysicians.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchMorePhysicians.fulfilled,
        (state, action: PayloadAction<UniversalUser[]>) => {
          state.isLoading = false;
          state.physicians = [...state.physicians, ...action.payload];
        },
      )
      .addCase(fetchMorePhysicians.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deletePhysician.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(deletePhysician.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(searchPhysician.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPhysician.fulfilled, (state, action) => {
        state.isLoading = false;
        state.physicians = action.payload;
      })
      .addCase(searchPhysician.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const PhysicianState = (state: RootState) => state.physician.physicians;

export default physicianSlice.reducer;
