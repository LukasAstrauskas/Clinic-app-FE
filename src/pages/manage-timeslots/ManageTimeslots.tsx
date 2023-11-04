import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimeslotList from './TimeslotList';
import PhysicianTable from '../../components/physician-table/PhysicianTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PhysicianSearchBar from '../../components/physician-table/PhysicianSearchBar';
import {
  selectPhysicians,
  fetchPhysicians,
  searchPhysician,
  setPhysician,
  selectPhysician,
} from '../../store/slices/physician/physicianSlice';

type props = {
  tableTitle?: string;
};
// Dublicates TimetablesContainer
const ManageTimeslots = ({ tableTitle = 'Physicians' }: props) => {
  // const type = useSelector(selectType);
  // const loggedInPhysicianId = useSelector(selectId);
  const physician = useAppSelector(selectPhysician);
  const dispatch = useAppDispatch();
  // const [refresh, setRefresh] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (search: string, occupation: string) => {
    if (search.length != 0 || occupation) {
      dispatch(searchPhysician({ search, occupation }));
      setIsSearch(true);
    } else {
      setIsSearch(false);
      dispatch(fetchPhysicians());
      // setRefresh(true);
    }
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
            <PhysicianSearchBar onSearch={handleSearch} />
            <PhysicianTable
              // refresh={refresh}
              // setRefresh={setRefresh}
              isSearch={isSearch}
            />
          </Grid>

          {/* {type === 'physician' ? (
            <Grid item lg={12}>
              <TimetableList physicianId={loggedInPhysicianId || ''} />
            </Grid>
          ) : ( */}
          <Grid item lg={8}>
            {physician.id ? <TimeslotList physicianId={physician.id} /> : <></>}
          </Grid>
          {/* )} */}
        </Grid>
      </Box>
    </Container>
  );
};

export default ManageTimeslots;
