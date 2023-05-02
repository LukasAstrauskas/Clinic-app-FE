import React, { useEffect, useState } from 'react';
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
import PhysicianSearchBar from '../physicians/PhysicianSearchBar';
import axios from 'axios';
import { Physician } from '../../model/Model';
import { PhyNameOccupation } from '../../model/Model';

type props = {
  tableTitle?: string;
};

const TimetablesContainer = ({ tableTitle = 'Physicians' }: props) => {
  const [filteredPhysicians, setFilteredPhysicians] = useState<Physician[]>([]);

  const physicians: PhyNameOccupation[] = useSelector(selectPhysicians);
  const physicianId: string | null = useSelector(selectPhysicianId);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (id: string) => {
    dispatch(setPhysicianId(id));
  };

  const handleSearch = async (searchText: string, searchBy: string) => {
    if (searchText.length != 0) {
      await axios
        .get(`http://localhost:8080/user/physicianSearch/${searchText}`)
        .then((response) => setFilteredPhysicians(response.data));
    }
  };

  useEffect(() => {
    dispatch(fetchPhyNameOccupation());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
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
          <Grid item lg={4} sx={{ pr: 2 }}>
            <PhysicianSearchBar onSearch={handleSearch} />
            <PhysicianTable
              physicians={filteredPhysicians}
              selectedId={physicianId}
              rowClick={handleClick}
            />
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
