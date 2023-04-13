import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimetableList from './TimetableList';
import PhysicianTable from '../physicians/PhysicianTable';
import { PhyNameOccupation } from '../../model/Model';
import axios from 'axios';

const TimetablesContainer = () => {
  const [physicians, setPhysicians] = useState<PhyNameOccupation[]>([]);
  const [phyId, setPhyId] = useState<string>('');
  const url = 'http://localhost:8080/physicianNamesOccupations';

  const handleClick = (physicianId: string) => {
    setPhyId(physicianId);
  };

  useEffect(() => {
    axios
      .get<PhyNameOccupation[]>(url)
      .then((response) => {
        setPhysicians(response.data);
        setPhyId(response.data[0].physicianId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth='lg'>
      <Box sx={{ flexGrow: 1, marginTop: '15%' }}>
        <Grid container>
          <Grid item lg={4} sx={{ pr: 2 }}>
            <PhysicianTable physicians={physicians} rowClick={handleClick} />
          </Grid>
          <Grid item lg={8}>
            {phyId === '' && <p>ID is null</p>}
            <TimetableList physicianId={phyId} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TimetablesContainer;
