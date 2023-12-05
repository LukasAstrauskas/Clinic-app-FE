import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import TimetableList from './TimetableList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PATIENT, PHYSICIAN } from '../../utils/Users';
import { pickTimeslot } from '../../store/slices/timeslot/timeslotSlice';
import {
  selectLoggedUserId,
  selectLoggedUserType,
} from '../../store/slices/loggedUser/loggedUserSlice';
import TimeslotsPhysiciansTable from '../../components/physician-table/TimeslotsPhysiciansTable';
import { selectPhysicianId } from '../../store/slices/users/physiciansSlice';

const TimetablesContainer = () => {
  const type = useAppSelector(selectLoggedUserType);
  const loggedUserId = useAppSelector(selectLoggedUserId);
  const physicianId = useAppSelector(selectPhysicianId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === PATIENT) {
      dispatch(
        pickTimeslot({
          id: '',
          physicianId: '',
          date: '',
          patientId: loggedUserId,
        }),
      );
    }
  }, []);

  return (
    <Container maxWidth={type === 'physician' ? 'md' : 'lg'}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={1}>
          <Grid
            item
            lg={12}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <h1>
              {type === PHYSICIAN ? 'Select Time' : 'Select Physician and Time'}
            </h1>
          </Grid>
          {type !== 'physician' && (
            <Grid item lg={4} sx={{ border: 2 }}>
              <TimeslotsPhysiciansTable />
            </Grid>
          )}
          {type === 'physician' ? (
            <Grid item lg={12}>
              <TimetableList physicianId={loggedUserId} />
            </Grid>
          ) : (
            <Grid item lg={8}>
              {physicianId ? (
                <TimetableList physicianId={physicianId} />
              ) : (
                <Box sx={{ display: 'flex', border: 2 }}>
                  <Card>
                    <CardContent>
                      <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        Select physician
                      </Typography>
                      <CircularProgress color='secondary' />
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default TimetablesContainer;
