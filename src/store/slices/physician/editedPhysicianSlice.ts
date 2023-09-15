import { createSlice } from '@reduxjs/toolkit';
import { PhysicianDto } from '../../../model/Model';
import { RootState } from '../../types';

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

// export const fetchPhysicianById = createAsyncThunk<PhysicianDto, string>(
//   'physician/fetchPhysicianById',
//   async (id) => {
//     const response = await axios.get(`${BASE_PHYSICIANS_FULL_URL}${id}`, {
//       headers: authHeader(),
//     });
//     return response.data as PhysicianDto;
//   },
// );

export const editedPhysicianSlice = createSlice({
  name: 'physicianDto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // .addCase(fetchPhysicianById.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(fetchPhysicianById.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.selectedPhysician = action.payload;
    // })
    // .addCase(fetchPhysicianById.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message || 'Something went wrong';
    // });
  },
});

export const selectPhysician = (state: RootState) =>
  state.physicianDto.selectedPhysician;

export default editedPhysicianSlice.reducer;
