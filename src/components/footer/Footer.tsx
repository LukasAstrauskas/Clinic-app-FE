import React from 'react';
import { PAGENEAME } from '../../utils/Constants';
import { Avatar, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import programmer from '../../assets/programmer.svg';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ backgroundColor: grey[100], paddingX: 2 }}
    >
      <Typography variant='subtitle1' component='div'>
        {dayjs().format('YYYY')} | {PAGENEAME}
      </Typography>
      <Avatar alt='Lukas' src={programmer} />
    </Stack>
  );
};

export default Footer;
