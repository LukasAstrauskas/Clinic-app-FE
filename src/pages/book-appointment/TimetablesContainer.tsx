import React, { useEffect, useState } from 'react';
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
import PhysicianTable from '../../components/physician-table/PhysicianTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PhysicianSearchBar from '../../components/physician-table/PhysicianSearchBar';
import {
  searchPhysician,
  selectPhysician,
} from '../../store/slices/physician/physicianSlice';
import { PATIENT } from '../../utils/Users';
import { pickTimeslot } from '../../store/slices/timeslot/timeslotSlice';
import {
  selectLoggedUserId,
  selectLoggedUserType,
} from '../../store/slices/loggedUser/loggedUserSlice';

type props = {
  tableTitle?: string;
};

const TimetablesContainer = ({ tableTitle = 'Physicians' }: props) => {
  const type = useAppSelector(selectLoggedUserType);
  const loggedUserId = useAppSelector(selectLoggedUserId);
  const physician = useAppSelector(selectPhysician);
  const dispatch = useAppDispatch();
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (search: string, occupation: string) => {
    console.log('Timetable-container. handleSearch ');
    if (search.length != 0 || occupation) {
      dispatch(searchPhysician({ search, occupation }));
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };
  /* Not  fetchPhyNameOccupation(), but <PhysicianSearchBar/> component
  provides physicians, search side effect.
  handleSearch() if no search param fetches physicians on component mount
  */
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
            <h1>{tableTitle}</h1>
          </Grid>
          {type !== 'physician' && (
            <Grid item lg={4} sx={{ border: 2 }}>
              <PhysicianSearchBar onSearch={handleSearch} />
              <PhysicianTable isSearch={isSearch} />
            </Grid>
          )}
          {type === 'physician' ? (
            <Grid item lg={12}>
              <TimetableList physicianId={loggedUserId} />
            </Grid>
          ) : (
            <Grid item lg={8}>
              {physician.id ? (
                <TimetableList physicianId={physician.id} />
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
