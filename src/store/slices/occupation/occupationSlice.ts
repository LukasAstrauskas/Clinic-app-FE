import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Occupation } from '../../../model/Model';
import { OCCUPATIONS_URL } from '../../../utils/httpConstants';
import axios from 'axios';
import { RootState } from '../../types';

interface OccupationsState {
  occupations: Occupation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OccupationsState = {
  occupations: [],
  isLoading: false,
  error: null,
};

export const fetchOccupations = createAsyncThunk(
  'occupations/fetchOccupations',
  async () => {
    const response = await axios.get(OCCUPATIONS_URL);
    return response.data;
  },
);

export const occupationsSlice = createSlice({
  name: 'occupations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccupations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOccupations.fulfilled,
        (state, action: PayloadAction<Occupation[]>) => {
          state.isLoading = false;
          state.occupations = action.payload;
        },
      )
      .addCase(fetchOccupations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectOccupations = (state: RootState) =>
  state.occupation.occupations;
export default occupationsSlice.reducer;
