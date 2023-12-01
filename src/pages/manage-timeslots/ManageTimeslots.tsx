import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimeslotList from './TimeslotList';
import PhysicianTable from '../../components/physician-table/PhysicianTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PhysicianSearchBar from '../../components/physician-table/PhysicianSearchBar';

import UserTable from '../book-appointment/UserTable';
import { PHYSICIAN } from '../../utils/Users';
import {
  clearPhysicians,
  selectOccupationId,
  selectPhysicianId,
  selectPhysicianSearch,
  selectPhysicians,
  setOccupationSearch,
  setPhysicianID,
  setPhysicianSearch,
} from '../../store/slices/users/physiciansSlice';
import {
  fetchPhysicians,
  searchPhysician,
} from '../../store/slices/physician/physicianSlice';
import UserSearchBar from '../book-appointment/UserSearchBar';
import { getUsers } from '../../store/slices/users/userActions';

type props = {
  tableTitle?: string;
};
// Dublicates TimetablesContainer
const ManageTimeslots = ({ tableTitle = 'Physicians' }: props) => {
  // const type = useSelector(selectType);
  // const loggedInPhysicianId = useSelector(selectId);
  const physicianId = useAppSelector(selectPhysicianId);
  const physicians = useAppSelector(selectPhysicians);
  const userType = PHYSICIAN;
  const search = useAppSelector(selectPhysicianSearch);
  const occupationId = useAppSelector(selectOccupationId);
  const dispatch = useAppDispatch();
  const [isSearch, setIsSearch] = useState(false);

  const rowClick = (id: string) => {
    dispatch(setPhysicianID(id));
  };

  // this method is called on component mount
  const handleSearch = (search: string, occupation: string) => {
    if (search.length != 0 || occupation) {
      dispatch(searchPhysician({ search, occupation }));
      setIsSearch(true);
    } else {
      setIsSearch(false);
      dispatch(fetchPhysicians());
    }
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
    // setOccupationID(occupationID);
    // dispatch(setOccupationSearch(occupationID));
    // onSearch('', userType, occupationID);
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

  /* Not  fetchPhyNameOccupation(), but <PhysicianSearchBar/> component
  provides physicians, search side effect.
  Sets physicianId to first ID in physicians list */
  // useEffect(() => {
  //   dispatch(fetchPhyNameOccupation());
  // }, []);

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
            {/* <PhysicianSearchBar onSearch={handleSearch} /> */}
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
