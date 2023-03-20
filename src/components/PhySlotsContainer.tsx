import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import PhysicianTimeTable from './PhysicianTimeTable';
import PhysicianTable from './PhysicianTable';
import doctors from '../data/doctorData';
import physiciansTimeslots, { Timeslot } from '../data/TimeSlotData';

const PhySlotsContainer = () => {
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);

  const handleClick = (id: string) => {
    const physicianTimeslots = physiciansTimeslots.filter(
      (timeslot) => timeslot.physicianID === id,
    );
    setTimeslots(physicianTimeslots);
  };

  return (
    <Container maxWidth='lg'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item lg={4} sx={{ pr: 2 }}>
            <PhysicianTable physicians={doctors} rowClick={handleClick} />
          </Grid>
          <Grid item lg={8}>
            <PhysicianTimeTable timeslots={timeslots} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PhySlotsContainer;
