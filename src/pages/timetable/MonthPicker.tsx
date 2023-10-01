import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Dayjs } from 'dayjs';

type DateState = {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
};

const MonthPicker = ({ date, setDate }: DateState) => {
  const arrowButtonSx = {
    color: grey[900],
    padding: 0,
    margin: 0,
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid
        container
        justifyContent='center'
        direction='row'
        spacing={0.5}
        alignItems='center'
      >
        <Grid item>
          <IconButton
            onClick={() => {
              setDate((prevDate) => prevDate.subtract(1, 'year'));
            }}
          >
            <KeyboardDoubleArrowLeftIcon sx={arrowButtonSx} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setDate((prevDate) => prevDate.subtract(1, 'month'));
            }}
          >
            <KeyboardArrowLeftIcon sx={arrowButtonSx} />
          </IconButton>
        </Grid>

        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format='YYYY, MMMM'
              views={['month']}
              value={date}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setDate(newValue.date(1));
                }
              }}
              sx={{ width: '12em' }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setDate((prevDate) => prevDate.add(1, 'month'));
            }}
          >
            <KeyboardArrowRightIcon sx={arrowButtonSx} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setDate((prevDate) => prevDate.add(1, 'year'));
            }}
          >
            <KeyboardDoubleArrowRightIcon sx={arrowButtonSx} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthPicker;
