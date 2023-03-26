import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import {
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Visibility } from '@mui/icons-material';

export const AddPatients = () => {
  const [open, setOpen] = useState(false);
  const [checkedPatients, setCheckedPatiens] = useState<any>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [duplicationError, setduplicationError] = useState(false);
  const GETrequest = new Request('http://localhost:8080/user/patients', {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });

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
  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'white',
    border: '2px solid #D3D3D3',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    fetch(GETrequest).then((res) => {
      if (!res.ok) {
        console.log('not good');
      } else {
        res.json().then((resJson) => {
          setPatients(resJson);
        });
      }
    });
  });

  type PatientType = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  const fixDuplicationError = () => {
    setduplicationError(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOpen = () => {
    setNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validation = (e: any) => {
    const inputId = e.target.id;
    const input = e.target.value;

    if (inputId.includes('new-patient-name-field')) {
      if (input === '') {
        setNameError(true);
      } else {
        setNameError(false);
      }
    }

    if (inputId.includes('new-patient-LastName-field')) {
      if (input === '') {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
    }

    if (inputId.includes('new-patient-email-field')) {
      if (!/\S+@\S+\.\S+/.test(input)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if (inputId.includes('new-patient-password-field')) {
      if (input === '') {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
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
    if (
      NameValue === '' ||
      LastNameValue === '' ||
      EmailValue === '' ||
      PasswordValue === ''
    ) {
      if (NameValue === '') {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (LastNameValue === '') {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
      if (EmailValue === '') {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      if (PasswordValue === '') {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    } else {
      if (!nameError && !LastNameError && !emailError && !passwordError) {
        const NewPatient = {
          name: NameValue + ' ' + LastNameValue,
          email: EmailValue,
          password: PasswordValue,
        };

        fetch('http://localhost:8080/user/patients', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(NewPatient),
        }).then((res) => {
          if (!res.ok) {
            console.log('not good');
            if (res.status === 500) {
              setduplicationError(true);
            }
          } else {
            setOpen(false);
          }
        });
      }
    }
  };

  const handleDelete = () => {
    checkedPatients.forEach((patient: string) => {
      fetch(`http://localhost:8080/user/${patient}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          console.log('Not goood');
        }
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
            ml: 1,
            mt: 2,
            mr: 0.6,
            scale: '170%',
            outline: 'none',
            borderBottom: 0,
          }}
        />
        <TextField
          onChange={handleSearch}
          sx={textFieldStyle}
          className='search'
          id='search'
          variant='outlined'
          placeholder='Search'
          style={{ width: '350px', marginLeft: 20 }}
        ></TextField>

        <Button
          onClick={handleOpen}
          sx={{
            ml: 5,
            mb: 3,
            scale: '90%',
            bgcolor: '#25ced1',
            '&:hover': {
              bgcolor: '#25ced1',
            },
          }}
          variant='contained'
        >
          Create new
          <AddIcon />
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
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
              sx={textFieldStyle}
              onBlur={validation}
              label='First name'
              id='new-patient-name-field'
              helperText={nameError && <>Name cannot be empty</>}
              error={nameError}
            ></TextField>
            <TextField
              sx={textFieldStyle}
              onBlur={validation}
              error={LastNameError}
              helperText={LastNameError && <>Last name cannot be empty</>}
              id='new-patient-LastName-field'
              label='Last name'
              style={{ marginLeft: '20px' }}
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
            <TextField
              sx={textFieldStyle}
              label='Email'
              id='new-patient-email-field'
              onChange={fixDuplicationError}
              onBlur={validation}
              error={emailError || duplicationError}
              helperText={
                (emailError && <>Incorrect email format</>) ||
                (duplicationError && <>Email already taken</>)
              }
            ></TextField>
            <TextField
              onBlur={validation}
              id='new-patient-password-field'
              type={showPassword ? 'text' : 'password'}
              helperText={passwordError && <>password cannot be empty</>}
              error={passwordError}
              label='Temporary password'
              sx={textFieldStyle}
              style={{ marginLeft: '20px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      <Visibility></Visibility>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Box>
          <Box
            sx={{
              mt: 9,
              textAlign: 'right',
            }}
          >
            <Button
              sx={{
                border: '1px solid orange',
                color: 'orange',
                '&:hover': {
                  color: 'orange',
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              sx={{
                marginLeft: 3,
                bgcolor: '#25ced1',
                '&:hover': {
                  bgcolor: '#25ced1',
                },
              }}
              onClick={handleCreate}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>

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
