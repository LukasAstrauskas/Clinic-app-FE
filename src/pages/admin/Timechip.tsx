import { Chip } from '@mui/material';
import React from 'react';

interface Props {
  time: string;
}

const chipSX = {
  '&:hover': {
    backgroundColor: '#1de9b6 !important',
  },
  cursor: 'pointer',
};

const Timechip = ({ time }: Props) => {
  return (
    <Chip
      label={time}
      variant='outlined'
      onDelete={() => alert('Delete: ' + time)}
      onClick={() => alert('Clicked!')}
      sx={chipSX}
    />
  );
};

export default Timechip;
