import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimetableList from './TimetableList';
import PhysicianTable from '../physicians/PhysicianTable';
import { AppDispatch } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPhyNameOccupation,
  selectPhysicianId,
  setPhysicianId,
} from '../../store/slices/physician/phyNameOccupationSlice';
import PhysicianSearchBar from '../physicians/PhysicianSearchBar';
import {
  PhysicianState,
  fetchPhysicians,
  searchPhysician,
} from '../../store/slices/physician/physicianSlice';

type props = {
  tableTitle?: string;
};

const TimetablesContainer = ({ tableTitle = 'Physicians' }: props) => {
  const physicianId: string | null = useSelector(selectPhysicianId);
  const physicians = useSelector(PhysicianState);
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);

  const handleClick = (id: string) => {
    dispatch(setPhysicianId(id));
  };

  const handleSearch = async (search: string, occupation: string) => {
    console.log(occupation);
    if (search.length != 0 || occupation) {
      dispatch(searchPhysician({ search, occupation }));
      console.log('search= ' + search);
      console.log('occupation= ' + occupation);
      setMore(false);
    } else {
      console.log('bad');
      dispatch(fetchPhysicians());
      setRefresh(true);
    }
  };

  useEffect(() => {
    dispatch(fetchPhysicians());
    dispatch(fetchPhyNameOccupation());
  }, [open]);

  return (
    <Container maxWidth='lg'>
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
              physicians={physicians}
              selectedId={physicianId}
              rowClick={handleClick}
              refresh={refresh}
              setRefresh={setRefresh}
              more={more}
              setMore={setMore}
            />
          </Grid>
          <Grid item lg={8}>
            {physicianId ? <TimetableList physicianId={physicianId} /> : <></>}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TimetablesContainer;
