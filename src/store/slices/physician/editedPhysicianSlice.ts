import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PhysicianDto } from '../../../model/Model';
import { BASE_PHYSICIANS_FULL_URL } from '../../../utils/httpConstants';
import axios from 'axios';
import { RootState } from '../../types';
import authHeader from '../../../authentication/authHeader';

interface PhysicianDtoState {
  physicians: PhysicianDto[];
  selectedPhysician: PhysicianDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PhysicianDtoState = {
  physicians: [],
  selectedPhysician: null,
  isLoading: false,
  error: null,
};

export const fetchPhysicianById = createAsyncThunk<PhysicianDto, string>(
  'physician/fetchPhysicianById',
  async (id) => {
    const response = await axios.get(`${BASE_PHYSICIANS_FULL_URL}${id}`, {
      headers: authHeader(),
    });
    return response.data as PhysicianDto;
  },
);

export const updatePhysician = createAsyncThunk<PhysicianDto, PhysicianDto>(
  'physician/updatePhysician',
  async (physician) => {
    const response = await axios.put(
      `${BASE_PHYSICIANS_FULL_URL}${physician.id}`,
      physician,
      {
        headers: authHeader(),
      },
    );
    return response.data as PhysicianDto;
  },
);

export const editedPhysicianSlice = createSlice({
  name: 'physicianDto',
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
      });
  },
});

export const selectPhysician = (state: RootState) =>
  state.physicianDto.selectedPhysician;

export default editedPhysicianSlice.reducer;
