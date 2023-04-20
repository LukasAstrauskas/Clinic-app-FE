import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Occupation, User } from '../../../model/Model';
import { OCCUPATIONS_URL } from '../../../utils/httpConstants';
import { RootState } from '../../types';

interface OccupationState {
  occupation: Occupation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OccupationState = {
  occupation: [],
  isLoading: false,
  error: null,
};

export const fetchOccupations = createAsyncThunk(
  'occupations/fetchOccupations',
  async () => {
    const response = await fetch(OCCUPATIONS_URL);
    const data = await response.json();
    return data;
  },
);

export const occupationSlice = createSlice({
  name: 'occupation',
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
          state.occupation = action.payload;
        },
      )
      .addCase(fetchOccupations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectOccupations = (state: RootState) =>
  state.occupation.occupation;

export default occupationSlice.reducer;
