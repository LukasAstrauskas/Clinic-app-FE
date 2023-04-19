import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AddPatientModal from '../../components/modals/AddPatientModal';
import axios from 'axios';
import TableHeadComponent from '../../components/tableComponents/HeadComponent';
import Styles from '../../components/styles/UserManagmentStyles';
import TableBodyComponent from '../../components/tableComponents/BodyComponent';
export const Patients = () => {
  const [open, setOpen] = useState(false);
  const [checkedPatients, setCheckedPatiens] = useState<string[]>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const getRequestUrl = `http://localhost:8080/user/patients?limit=2`;
  const getRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function getData() {
    await axios
      .get(getRequestUrl, { headers: getRequestHeaders })
      .then((res) => {
        setPatients(res.data);
      });
  }

  type PatientType = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

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
      const getRequestHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      axios
        .get(`http://localhost:8080/user/test/${search}`, {
          headers: getRequestHeaders,
        })
        .then((res) => {
          setPatients(res.data);
        });
    } else {
      setRefresh(true);
      getData();
    }
  };

  useEffect(() => {
    getData();
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
            sizeEndpoint='user/patientSize'
            endpoint='user/patients/limit/'
            setRefresh={setRefresh}
            refresh={refresh}
            setUser={setPatients}
            collumValue='patient'
            user={patients}
            handleChecked={handleChecked}
          />
        </TableContainer>
      </Box>
    </>
  );
};

export default Patients;
