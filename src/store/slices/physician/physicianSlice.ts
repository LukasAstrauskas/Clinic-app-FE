import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Physician,
  PhysicianDto,
  UniversalUser,
  User,
} from '../../../model/Model';
import {
  BASE_PHYSICIANS_FULL_URL,
  BASE_PHYSICIANS_URL,
  PHYSICIANS_FULL_URL,
  INCOMING_PHYSICIANS_TO_BE_RENDERED_URL,
  PHYSICIANS_URL_FOR_DELETE,
  PHYSICIAN_SEARCH_URL,
} from '../../../utils/httpConstants';
import axios from 'axios';
import { RootState } from '../../types';

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

export const fetchPhysicianById = createAsyncThunk<Physician, string>(
  'physician/fetchPhysicianById',
  async (id) => {
    const response = await axios.get(`${BASE_PHYSICIANS_URL}${id}`);
    return response.data as Physician;
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

export const fetchPhysicians = createAsyncThunk(
  'user/fetchPhysicians',
  async () => {
    const response = await axios.get<User[]>(PHYSICIANS_FULL_URL);
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
      PHYSICIANS_URL_FOR_DELETE + id,
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

export const selectPhysician = (state: RootState) =>
  state.physician.selectedPhysician;
export const PhysicianState = (state: RootState) => state.physician.physicians;

export default physicianSlice.reducer;
