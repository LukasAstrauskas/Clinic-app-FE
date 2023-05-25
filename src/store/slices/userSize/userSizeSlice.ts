import axios from 'axios';
import {
  ADMIN_SIZE_URL,
  PATIENTS_BY_PHYSICIANS_ID_SIZE_URL,
  PATIENT_SIZE_URL,
  PHYSICIAN_SIZE_URL,
} from '../../../utils/httpConstants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../types';
import authHeader from '../../../authentication/authHeader';

interface UserSize {
  size: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserSize = {
  size: 0,
  isLoading: false,
  error: null,
};

export const fetchPatientAmount = createAsyncThunk<number>(
  'patients/fetchPatientAmount',
  async () => {
    const response = await axios.get<number>(PATIENT_SIZE_URL, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const fetchAdminAmount = createAsyncThunk<number>(
  'patients/fetchAdminAmount',
  async () => {
    const response = await axios.get<number>(ADMIN_SIZE_URL, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const fetchPhysicianAmount = createAsyncThunk<number>(
  'patients/fetchPhysicianAmount',
  async () => {
    const response = await axios.get<number>(PHYSICIAN_SIZE_URL, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const fetchPatientsByPhysicianAmount = createAsyncThunk(
  'patients/fetchPatientsByPhysicianAmount',
  async ({ id }: { id: string | null }) => {
    const response = await axios.get<number>(
      PATIENTS_BY_PHYSICIANS_ID_SIZE_URL + id,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  },
);

export const userSizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientAmount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPatientAmount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.size = action.payload;
        },
      )
      .addCase(fetchPatientAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchAdminAmount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminAmount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.size = action.payload;
        },
      )
      .addCase(fetchAdminAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPhysicianAmount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPhysicianAmount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.size = action.payload;
        },
      )
      .addCase(fetchPhysicianAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPatientsByPhysicianAmount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPatientsByPhysicianAmount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.size = action.payload;
        },
      )
      .addCase(fetchPatientsByPhysicianAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectUserSize = (state: RootState) => state.size.size;

export default userSizeSlice.reducer;
