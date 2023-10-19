import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Physician, UniversalUser, User } from '../../../model/Model';
import {
  PHYSICIANS_FULL_URL,
  INCOMING_PHYSICIANS_TO_BE_RENDERED_URL,
  PHYSICIAN_SEARCH_URL,
} from '../../../utils/httpConstants';
import axios from 'axios';
import { RootState } from '../../reducers';
import authHeader from '../../../authentication/authHeader';

interface PhysicianState {
  physicians: UniversalUser[];
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
    const response = await axios.get<User[]>(PHYSICIANS_FULL_URL, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const resetPhysicianData = createAsyncThunk(
  'user/reset-physcians',
  async () => {
    return [];
  },
);

export const fetchMorePhysicians = createAsyncThunk(
  'user/fetchMorePhysicians',
  async (offset: number) => {
    const response = await axios.get<UniversalUser[]>(
      INCOMING_PHYSICIANS_TO_BE_RENDERED_URL + offset,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  },
);

export const searchPhysician = createAsyncThunk(
  'user/searchPhysician',
  async ({ search, occupation }: { search: string; occupation?: string }) => {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search);
    }
    if (occupation) {
      params.append('occupation', occupation);
    }

    const response = await axios.get(`${PHYSICIAN_SEARCH_URL}?${params}`, {
      headers: authHeader(),
    });

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
      .addCase(fetchPhysicians.fulfilled, (state, action) => {
        state.isLoading = false;
        state.physicians = action.payload;
      })
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
      })
      .addCase(resetPhysicianData.fulfilled, (state, action) => {
        state.physicians = action.payload;
      });
  },
});

export const selectPhysician = (state: RootState) =>
  state.physician.selectedPhysician;
export const selectPhysicians = (state: RootState) =>
  state.physician.physicians;

export default physicianSlice.reducer;
