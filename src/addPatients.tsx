import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import PatientDB from './MockDB';
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
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const AddPatients = () => {
  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState<typeof PatientDB>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [checkedPatients, setCheckedPatiens] = useState<any>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const GETrequest = new Request('http://localhost:8080/user', {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });

  useEffect(() => {
    fetch(GETrequest)
      .then((res) => res.json())
      .then((resJson) => {
        setPatients(resJson);
      });
  });

  type PatientType = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    const NameValue = (
      document.getElementById('new-patient-name-field') as HTMLInputElement
    ).value;
    const LastNameValue = (
      document.getElementById('new-patient-LastName-field') as HTMLInputElement
    ).value;
    const EmailValue = (
      document.getElementById('new-patient-email-field') as HTMLInputElement
    ).value;
    const PasswordValue = (
      document.getElementById('new-patient-password-field') as HTMLInputElement
    ).value;

    const NewPatient = {
      name: NameValue + ' ' + LastNameValue,
      email: EmailValue,
      password: PasswordValue,
    };

    fetch('http://localhost:8080/user/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(NewPatient),
    });
    setOpen(false);
  };

  const handleDelete = () => {
    checkedPatients.forEach((patient: string) => {
      fetch(`http://localhost:8080/user/${patient}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    });
    setCheckedPatiens([]);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPatient = e.target;
    let temp = checkedPatients;
    if (selectedPatient.checked) {
      setCheckedPatiens([...checkedPatients, selectedPatient.id]);
    } else {
      temp = temp.filter((patient: any) => patient !== selectedPatient.id);
      setCheckedPatiens(temp);
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
        <SearchIcon
          sx={{
            mt: 2,
            mr: 0.6,
            scale: '170%',
            outline: 'none',
            borderBottom: 0,
          }}
        />
        <TextField
          onChange={handleSearch}
          sx={{ pb: 5, scale: '90%' }}
          className='search'
          id='search'
          variant='outlined'
          placeholder='Search'
          inputProps={{
            style: { width: '21rem', fontSize: '17px' },
          }}
        ></TextField>

        <Button
          onClick={handleOpen}
          sx={{
            ml: 5,
            mb: 1.7,
            scale: '130%',
          }}
          variant='contained'
        >
          Create new
          <AddIcon />
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            px: '30px',
            py: '10px',
            width: '500px',
            height: '350px',
          }}
        >
          <Typography
            variant='h5'
            align='center'
            style={{
              marginTop: 30,
              fontWeight: '700',
            }}
          >
            Add new patients
          </Typography>
          <Box
            sx={{
              width: '470px',
              m: 'auto',
              mt: '30px',
              scale: '90%',
            }}
          >
            <TextField
              label='First name'
              id='new-patient-name-field'
            ></TextField>
            <TextField
              id='new-patient-LastName-field'
              label='Last name'
              sx={{
                ml: '20px',
              }}
            ></TextField>
          </Box>

          <Box
            sx={{
              width: '470px',
              m: 'auto',
              mt: '30px',
              scale: '90%',
            }}
          >
            <TextField label='Email' id='new-patient-email-field'></TextField>
            <TextField
              id='new-patient-password-field'
              type='password'
              label='Temporary password'
              sx={{
                ml: '20px',
              }}
            >
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            </TextField>
          </Box>

          <Box
            sx={{
              mt: 9,
              textAlign: 'right',
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant='contained'
              sx={{ marginLeft: 3 }}
              onClick={handleCreate}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Dialog>

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
                    // maxWidth: 36
                  }}
                >
                  {' '}
                  <IconButton onClick={handleDelete} color='error'>
                    <DeleteIcon />
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
