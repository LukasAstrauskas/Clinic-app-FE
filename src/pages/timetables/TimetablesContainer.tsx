import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimetableList from './TimetableList';
import PhysicianTable from './PhysicianTable';
import { PhyNameOccupation, Timeslots } from '../../model/Model';
import axios from 'axios';

const TimetablesContainer = () => {
  const [timeslots, setTimeslots] = useState<Timeslots[]>([]);
  const [physicians, setPhysicians] = useState<PhyNameOccupation[]>([]);
  const [phyId, setPhyId] = useState<string>('');
  const url = 'http://localhost:8080/physicianNamesOccupations';
  const timeslotsURL = 'http://localhost:8080/timeslot/getPhyTimeslots/';

  const handleClick = (physicianId: string) => {
    setPhyId(physicianId);
    axios
      .get<Timeslots[]>(timeslotsURL + physicianId)
      .then((response) => {
        const list = response.data;
        setTimeslots(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get<PhyNameOccupation[]>(url)
      .then((response) => {
        setPhysicians(response.data);
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
            <TimetableList physicianId={phyId} timeslots={timeslots} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TimetablesContainer;
