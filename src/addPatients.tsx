import React, { useState } from 'react';
import Button from '@mui/material/Button';
// import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box, ThemeProvider, createTheme } from '@mui/system';
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
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#e0461f',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export const AddPatients = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          // onChange={handleSearch}
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
            <TextField label='First name'></TextField>
            <TextField
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
            <TextField label='Email'></TextField>
            <TextField
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
            <Button variant='contained'>Create</Button>
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
                <TableCell>
                  {' '}
                  <IconButton color='error'>
                    <DeleteIcon />
                  </IconButton>{' '}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: '700',
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: '700',
                  }}
                  align='center'
                >
                  Email
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {PatientDB.map((patient, index) => (
                <TableRow
                  key={index}
                  sx={{
                    width: '100%',
                    '&:last-child td,  &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>
                    {' '}
                    <Checkbox />{' '}
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
