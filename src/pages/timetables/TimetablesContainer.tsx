import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimetableList from './TimetableList';
import PhysicianTable from '../physicians/PhysicianTable';
import { AppDispatch } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPhyNameOccupation,
  selectPhysicianId,
  selectPhysicians,
  setPhysicianId,
} from '../../store/slices/physician/phyNameOccupationSlice';

const TimetablesContainer = () => {
  const physicians = useSelector(selectPhysicians);
  const physicianId = useSelector(selectPhysicianId);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (id: string) => {
    dispatch(setPhysicianId(id));
  };

  useEffect(() => {
    dispatch(fetchPhyNameOccupation());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <Box sx={{ flexGrow: 1, marginTop: '15%' }}>
        <Grid container>
          <Grid item lg={4} sx={{ pr: 2 }}>
            <PhysicianTable physicians={physicians} rowClick={handleClick} />
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
