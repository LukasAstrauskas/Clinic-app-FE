import React from 'react';
import Button from '@mui/material/Button';
// import Input from '@mui/material/Input
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import PatientDB from './MockDB';
const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

const AddPatients = () => {
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
          sx={{ pb: 5, scale: '90%' }}
          variant='filled'
          placeholder='Search'
          inputProps={{
            disableUnderline: true,
            style: { width: '21rem', fontSize: '17px' },
          }}
        ></TextField>

        <Button
          sx={{
            ml: 5,
            mb: 1,
            scale: '130%',
          }}
          variant='contained'
        >
          Create new
        </Button>
      </Box>

      <Box
        sx={{
          m: 'auto',
          width: 600,
        }}
      >
        {PatientDB.map((patient, index) => (
          <h3 key={index}>{patient.name}</h3>
        ))}
      </Box>
    </>
  );
};
export default AddPatients;
