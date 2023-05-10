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
  selectPhysicians,
  fetchPhysicians,
  searchPhysician,
} from '../../store/slices/physician/physicianSlice';
import { selectId, selectType } from '../../store/slices/auth/authSlice';

type props = {
  tableTitle?: string;
};

const TimetablesContainer = ({ tableTitle = 'Physicians' }: props) => {
  const type = useSelector(selectType);
  const loggedInPhysicianId = useSelector(selectId);
  const physicianId: string | null = useSelector(selectPhysicianId);
  const physicians = useSelector(selectPhysicians);
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleClick = (id: string) => {
    dispatch(setPhysicianId(id));
  };

  const handleSearch = (search: string, occupation: string) => {
    if (search.length != 0 || occupation) {
      dispatch(searchPhysician({ search, occupation }));
      setIsSearch(true);
    } else {
      setIsSearch(false);
      dispatch(fetchPhysicians());
      setRefresh(true);
    }
  };

  useEffect(() => {
    dispatch(fetchPhyNameOccupation());
  }, []);

  return (
    <Container maxWidth={type === 'physician' ? 'md' : 'lg'}>
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
          {type !== 'physician' && (
            <Grid item lg={4} sx={{ pr: 2 }}>
              <PhysicianSearchBar onSearch={handleSearch} />
              <PhysicianTable
                physicians={physicians}
                selectedId={physicianId}
                rowClick={handleClick}
                refresh={refresh}
                setRefresh={setRefresh}
                isSearch={isSearch}
              />
            </Grid>
          )}
          {type === 'physician' ? (
            <Grid item lg={12}>
              <TimetableList physicianId={loggedInPhysicianId || ''} />
            </Grid>
          ) : (
            <Grid item lg={8}>
              {physicianId ? (
                <TimetableList physicianId={physicianId} />
              ) : (
                <></>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default TimetablesContainer;
