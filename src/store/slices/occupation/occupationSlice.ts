import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Occupation } from '../../../model/Model';
import { ALL_OCCUPATIONS, BASE_URL } from '../../../utils/httpConstants';
import axios from 'axios';
import { RootState } from '../../reducers';
import { Status } from '../../../utils/Status';

interface OccupationsState {
  occupations: Occupation[];
  status: Status.IDLE | Status.PENDING | Status.SUCCEEDED | Status.FAILED;
  error: string | null;
}

const initialState: OccupationsState = {
  occupations: [],
  status: Status.IDLE,
  error: null,
};

export const fetchOccupations = createAsyncThunk(
  'occupation/fetchOccupations',
  async () => {
    const response = await axios.get(
      BASE_URL.concat(ALL_OCCUPATIONS),
      //  {headers: authHeader(),}
    );
    return response.data;
  },
);

export const occupationSlice = createSlice({
  name: 'occupation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccupations.pending, (state) => {
        state.status = Status.PENDING;
        state.error = null;
      })
      .addCase(
        fetchOccupations.fulfilled,
        (state, action: PayloadAction<Occupation[]>) => {
          state.status = Status.SUCCEEDED;
          state.occupations = action.payload;
        },
      )
      .addCase(fetchOccupations.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectOccupations = (state: RootState) =>
  state.occupation.occupations;

export default occupationSlice.reducer;
