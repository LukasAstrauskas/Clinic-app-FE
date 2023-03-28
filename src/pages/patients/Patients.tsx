import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPatientModal from '../../components/modals/AddPatientModal';
import axios from 'axios';

export const Patients = () => {
  const [open, setOpen] = useState(false);
  const [checkedPatients, setCheckedPatiens] = useState<any>([]);
  const [unCheck, setUnCheck] = useState<any>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const getRequestUrl = 'http://localhost:8080/user/patients';
  const getRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const textFieldStyle = {
    width: '47%',
    '& .MuiInputBase-root': {
      background: '#ededed',
    },
    '& .MuiFormHelperText-root': {
      minHeight: '40px',
    },
    '& .MuiInputLabel-root': {
      color: '#28cdcb',
      marginTop: '0.8rem',
    },
  };

  const createNewButtonStyle = {
    ml: 5,
    mb: 3,
    scale: '90%',
    bgcolor: '#25ced1',
    '&:hover': {
      bgcolor: '#25ced1',
    },
  };

  const searchIcon = {
    ml: 1,
    mt: 2,
    mr: 0.6,
    scale: '170%',
    outline: 'none',
    borderBottom: 0,
  };

  useEffect(() => {
    async function getData() {
      try {
        await axios
          .get(getRequestUrl, {
            headers: getRequestHeaders,
          })
          .then((res) => {
            setPatients(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [open, checkedPatients]);

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
    checkedPatients.forEach((patient: string) => {
      const deleteURL = `http://localhost:8080/user/${patient}`;
      axios.delete(deleteURL);
    });
    setCheckedPatiens([]);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const selectedPatient = e.target;
    let temp = checkedPatients;
    if (selectedPatient.checked) {
      setUnCheck([...unCheck, selectedPatient]);
      setCheckedPatiens([...checkedPatients, selectedPatient.id]);
    } else {
      temp = temp.filter((patient: any) => patient !== selectedPatient.id);
      setCheckedPatiens(temp);
      console.log(temp);
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
          mt: 10,
        }}
      >
        <SearchIcon sx={searchIcon} />
        <TextField
          onChange={handleSearch}
          sx={textFieldStyle}
          className='search'
          id='search'
          variant='outlined'
          placeholder='Search'
          style={{ width: '350px', marginLeft: 20 }}
        />

        <Button
          onClick={handleOpen}
          sx={createNewButtonStyle}
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
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: '#d3d3d3',
                    Width: '10px',
                  }}
                >
                  {' '}
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon sx={{ color: 'orange' }} />
                  </IconButton>{' '}
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: '#d3d3d3',
                    fontWeight: '700',
                    Width: '40%',
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: '#d3d3d3',
                    fontWeight: '700',
                    Width: '40%',
                  }}
                  align='center'
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: '#d3d3d3',
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow
                  key={index}
                  sx={{
                    width: '100%',
                    bgcolor: '#d3d3d3',
                  }}
                >
                  <TableCell>
                    <Checkbox
                      id={patient.id.toString()}
                      onChange={handleChecked}
                    />
                  </TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell align='center'>{patient.email}</TableCell>
                  <TableCell>
                    <IconButton color='primary'>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
