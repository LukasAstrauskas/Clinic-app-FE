import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimeslotList from './TimeslotList';
import { useAppSelector } from '../../store/hooks';
import { selectPhysicianId } from '../../store/slices/users/physiciansSlice';
import TimeslotsPhysiciansTable from '../../components/physician-table/TimeslotsPhysiciansTable';

const ManageTimeslots = () => {
  const physicianId = useAppSelector(selectPhysicianId);

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
            <h1>Manage Timeslots</h1>
          </Grid>

          <Grid item lg={4} sx={{ pr: 2 }}>
            <TimeslotsPhysiciansTable />
          </Grid>
          <Grid item lg={8}>
            {physicianId ? (
              <TimeslotList physicianId={physicianId} />
            ) : (
              <>
                <h3>Pick physician</h3>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ManageTimeslots;
