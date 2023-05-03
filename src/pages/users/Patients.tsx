import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  fetchPatients,
  searchPatient,
  selectPatients,
} from '../../store/slices/patient/patientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import AddPatientModal from '../../components/modals/AddPatientModal';
import TableHeadComponent from '../../components/tableComponents/HeadComponent';
import Styles from '../../components/styles/UserManagmentStyles';
import TableBodyComponent from '../../components/tableComponents/BodyComponent';
import AppointmentContext from '../../hooks/AppointmentContext';
export const Patients = () => {
  const dispatch = useDispatch<AppDispatch>();
  const patients = useSelector(selectPatients);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { appointment, setAppointment } = useContext(AppointmentContext);
  const choosePatient = (patientId: string): void => {
    setAppointment({ ...appointment, patientId: patientId });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search.length != 0) {
      dispatch(searchPatient(search));
      setMore(false);
    } else {
      dispatch(fetchPatients());
      setRefresh(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 600,
          m: 'auto',
        }}
      >
        <SearchIcon sx={Styles.searchIcon} />
        <TextField
          onChange={handleSearch}
          onBlur={() => handleSearch}
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
      <AddPatientModal setOpen={setOpen} open={open} />

      <Box
        sx={{
          m: 'auto',
          width: 600,
        }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
          <Table stickyHeader>
            <TableHeadComponent collumName='Email' />
          </Table>
          <TableBodyComponent
            type='patient'
            more={more}
            setMore={setMore}
            setRefresh={setRefresh}
            refresh={refresh}
            user={patients}
            rowClick={choosePatient}
          />
        </TableContainer>
      </Box>
    </>
  );
};

export default Patients;
