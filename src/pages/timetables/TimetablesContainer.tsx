import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimetableList from './TimetableList';
import PhysicianTable from '../physicians/PhysicianTable';
import { AppDispatch } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPhysicians,
  selectPhysicianId,
  selectPhysicians,
  setPhysicianId,
} from '../../store/slices/physician/physicianSlice';

const TimetablesContainer = () => {
  const physicians = useSelector(selectPhysicians);
  const physicianId = useSelector(selectPhysicianId);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (id: string) => {
    dispatch(setPhysicianId(id));
  };

  useEffect(() => {
    dispatch(fetchPhysicians());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <Box sx={{ flexGrow: 1, marginTop: '15%' }}>
        <Grid container>
          <Grid item lg={4} sx={{ pr: 2 }}>
            <PhysicianTable physicians={physicians} rowClick={handleClick} />
          </Grid>
          <Grid item lg={8}>
            {physicianId ? (
              <TimetableList physicianId={physicianId} />
            ) : (
              <p>ID is null</p>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TimetablesContainer;
