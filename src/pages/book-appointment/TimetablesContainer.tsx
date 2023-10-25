import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TimetableList from './TimetableList';
import PhysicianTable from '../../components/physician-table/PhysicianTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchPhyNameOccupation,
  selectPhysicianId,
  setPhysicianId,
} from '../../store/slices/physician/phyNameOccupationSlice';
import PhysicianSearchBar from '../../components/physician-table/PhysicianSearchBar';
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
  const type = useAppSelector(selectType);
  const loggedInPhysicianId = useAppSelector(selectId);
  const physicianId: string | null = useAppSelector(selectPhysicianId);
  const physicians = useAppSelector(selectPhysicians);
  const dispatch = useAppDispatch();
  // const [refresh, setRefresh] = useState<boolean>(false);
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
      // setRefresh(true);
    }
  };
  /* Not  fetchPhyNameOccupation(), but <PhysicianSearchBar/> component
  provides physicians, search side effect.
  handleSearch() if no search param fetches physicians on component mount
  */
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
              <p>Size: {physicians.length}</p>
              <PhysicianSearchBar onSearch={handleSearch} />
              <PhysicianTable
                physicians={physicians}
                selectedId={physicianId}
                rowClick={handleClick}
                // refresh={refresh}
                // setRefresh={setRefresh}
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
