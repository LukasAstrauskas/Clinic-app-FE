import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import PhysicianModalContent from '../../components/modals/AddPhysicianModal';
import Styles from '../../components/styles/UserManagmentStyles';
import TableHeadComponent from '../../components/tableComponents/HeadComponent';
import TableBodyComponent from '../../components/tableComponents/BodyComponent';
import {
  PhysicianState,
  fetchPhysicians,
  searchPhysician,
} from '../../store/slices/physician/physicianSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import {
  deletePatient,
  fetchMorePatients,
  fetchPatients,
} from '../../store/slices/patient/patientSlice';

export const Physicians = () => {
  const dispatch = useDispatch<AppDispatch>();
  const physicians = useSelector(PhysicianState);
  const [more, setMore] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [checkedPhysician, setCheckedPhysician] = useState<string[]>([]);
  const getRequestUrl = 'http://localhost:8080/physicianInfo';
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    checkedPhysician.forEach((physician) => {
      dispatch(deletePatient(physician));
    });
    setCheckedPhysician([]);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectePhysician = e.target;
    if (selectePhysician.checked) {
      setCheckedPhysician([...checkedPhysician, selectePhysician.id]);
    } else {
      setCheckedPhysician(
        checkedPhysician.filter(
          (physician) => physician !== selectePhysician.id,
        ),
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    if (search.length != 0) {
      dispatch(searchPhysician(search));
      setMore(false);
    } else {
      dispatch(fetchPhysicians());
      setRefresh(true);
    }
  };

  useEffect(() => {
    console.log('started');
    dispatch(fetchPhysicians());
  }, [open]);

  return (
    <>
      <Typography
        variant='h3'
        sx={{
          textAlign: 'center',
          marginTop: 5,
          marginBottom: -5,
          fontWeight: 'bold',
          color: '#28cdcb',
        }}
      >
        Physicians
      </Typography>
      <Box
        sx={{
          width: 600,
          m: 'auto',
          mt: 10,
        }}
      >
        <SearchIcon sx={Styles.searchIcon} />
        <TextField
          onChange={handleSearch}
          sx={Styles.searchField}
          className='search'
          id='search'
          variant='outlined'
          placeholder='Search'
        />

        <Button
          onClick={handleOpen}
          sx={Styles.createNewUserBtn}
          variant='contained'
        >
          Create new
          <AddIcon />
        </Button>
      </Box>
      <PhysicianModalContent setOpen={setOpen} open={open} />
      <Box
        sx={{
          m: 'auto',
          width: 600,
        }}
      >
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHeadComponent
              handleDelete={handleDelete}
              collumName='occupation'
            />
          </Table>

          <TableBodyComponent
            type='physician'
            more={more}
            setMore={setMore}
            setRefresh={setRefresh}
            refresh={refresh}
            user={physicians}
            handleChecked={handleChecked}
          />
        </TableContainer>
      </Box>
    </>
  );
};
