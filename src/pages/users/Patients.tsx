import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPatientModal from '../../components/modals/AddPatientModal';
import axios from 'axios';
import TableHeadComponent from '../../components/tableComponents/HeadComponent';
import Styles from '../../components/styles/UserManagmentStyles';
import TableBodyComponent from '../../components/tableComponents/BodyComponent';
import { grey } from '@mui/material/colors';
import AppointmentContext from '../../hooks/AppointmentContext';
export const Patients = () => {
  const [open, setOpen] = useState(false);
  const [checkedPatients, setCheckedPatiens] = useState<string[]>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const getRequestUrl = 'http://localhost:8080/user/patients';

  useEffect(() => {
    const getRequestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    async function getData() {
      await axios
        .get(getRequestUrl, {
          headers: getRequestHeaders,
        })
        .then((res) => {
          setPatients(res.data);
        });
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, checkedPatients]);

  type PatientType = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  const { appointment, setAppointment } = useContext(AppointmentContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    checkedPatients.forEach((patient) => {
      const deleteURL = `http://localhost:8080/user/patients/${patient}`;
      axios.delete(deleteURL);
    });
    setCheckedPatiens([]);
  };

  const choosePatient = (patientId: string): void => {
    setAppointment({ ...appointment, patientId: patientId });
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
    const allTableRows = document.querySelectorAll('tr');
    const search = e.target.value.toLowerCase();
    if (search.length === 0) {
      allTableRows.forEach((row) => {
        row.classList.remove('hidden');
      });
    } else {
      allTableRows.forEach((row) => {
        const rowText = row.textContent?.toLocaleLowerCase();
        row.classList.add('hidden');
        if (rowText?.includes(search) || rowText?.includes('name')) {
          row.classList.remove('hidden');
        }
      });
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
            <TableHeadComponent
              handleDelete={handleDelete}
              collumName='Email'
            />
            <TableBodyComponent
              collumValue='patient'
              user={patients}
              handleChecked={handleChecked}
              rowClick={choosePatient}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Patients;
