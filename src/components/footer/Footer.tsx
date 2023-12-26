import React from 'react';
import styles from './Footer.module.css';
import { PAGENEAME } from '../../utils/Constants';
import { AppBar, Avatar, Stack, Toolbar, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import programmer from '../../assets/programmer.svg';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <>
      {/* <div className={styles.footer}>
        <div>2023 | {PAGENEAME}</div>
        <div>
          Made by <b>G-Unit-Team</b> &copy;
        </div>
      </div> */}

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
    </>
  );
};

export default Footer;
