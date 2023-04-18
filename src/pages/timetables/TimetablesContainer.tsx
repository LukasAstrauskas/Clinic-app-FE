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

type props = {
  tableTitle?: string;
  choosePhysician?: (phyId: string) => void;
};

const TimetablesContainer = ({
  tableTitle = 'Physicians',
  choosePhysician,
}: props) => {
  const physicians = useSelector(selectPhysicians);
  const physicianId = useSelector(selectPhysicianId);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (id: string) => {
    dispatch(setPhysicianId(id));
    if (choosePhysician !== undefined && physicianId !== null) {
      choosePhysician(physicianId);
    }
  };

  useEffect(() => {
    dispatch(fetchPhyNameOccupation());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <Box sx={{ flexGrow: 1, marginTop: '10%' }}>
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
