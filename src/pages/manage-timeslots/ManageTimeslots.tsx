import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimeslotList from './TimeslotList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import UserTable from '../book-appointment/UserTable';
import { PHYSICIAN } from '../../utils/Users';
import {
  clearPhysicians,
  selectOccupationId,
  selectPhysicianId,
  selectPhysicianSearch,
  selectPhysicians,
  setPhysicianID,
  setPhysicianSearch,
} from '../../store/slices/users/physiciansSlice';
import UserSearchBar from '../book-appointment/UserSearchBar';
import { getUsers } from '../../store/slices/users/userActions';

type props = {
  tableTitle?: string;
};
// Dublicates TimetablesContainer
const ManageTimeslots = ({ tableTitle = 'Physicians' }: props) => {
  const physicianId = useAppSelector(selectPhysicianId);
  const physicians = useAppSelector(selectPhysicians);
  const userType = PHYSICIAN;
  const search = useAppSelector(selectPhysicianSearch);
  const occupationId = useAppSelector(selectOccupationId);
  const dispatch = useAppDispatch();

  const rowClick = (id: string) => {
    dispatch(setPhysicianID(id));
  };

  const onSearch = (
    search: string,
    userType: string,
    occupationId?: string | undefined,
  ): void => {
    dispatch(setPhysicianSearch(search));
    dispatch(clearPhysicians());
    dispatch(
      getUsers({
        search,
        userType,
        occupationId,
      }),
    );
  };

  const onOccupationChange = (occupationId: string) => {
    console.log(search + ' ' + occupationId + ' ' + userType);
    dispatch(clearPhysicians());
    dispatch(
      getUsers({
        search,
        userType,
        occupationId,
      }),
    );
  };

  return (
    <Container maxWidth={'lg'}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid
            item
            lg={12}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <h1>{tableTitle}</h1>
          </Grid>

          <Grid item lg={4} sx={{ pr: 2 }}>
            <UserSearchBar
              onSearch={onSearch}
              userType={userType}
              onOccupationChange={onOccupationChange}
              searchState={search}
            />
            <UserTable
              users={physicians}
              search={search}
              userType={userType}
              onClick={rowClick}
              selectedID={physicianId}
              occupationId={occupationId}
            />
          </Grid>
          <Grid item lg={8}>
            {physicianId ? <TimeslotList physicianId={physicianId} /> : <></>}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ManageTimeslots;
