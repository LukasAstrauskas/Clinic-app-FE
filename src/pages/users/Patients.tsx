import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  deletePatient,
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
export const Patients = () => {
  const dispatch = useDispatch<AppDispatch>();
  const patients = useSelector(selectPatients);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState<boolean>(true);
  const [checkedPatients, setCheckedPatiens] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    checkedPatients.forEach((patient) => {
      dispatch(deletePatient(patient));
    });
    setCheckedPatiens([]);
  };
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPatient = e.target;
    if (selectedPatient.checked) {
      setCheckedPatiens([...checkedPatients, selectedPatient.id]);
    } else {
      setCheckedPatiens(
        checkedPatients.filter((patient) => patient !== selectedPatient.id),
      );
    }
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
  useEffect(() => {
    dispatch(fetchPatients());
  }, []);
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
        Patients
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
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHeadComponent
              handleDelete={handleDelete}
              collumName='email'
            />
          </Table>
          <TableBodyComponent
            type='patient'
            more={more}
            setMore={setMore}
            setRefresh={setRefresh}
            refresh={refresh}
            user={patients}
            handleChecked={handleChecked}
          />
        </TableContainer>
      </Box>
    </>
  );
};

export default Patients;
