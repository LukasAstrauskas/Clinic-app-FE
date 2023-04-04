import React from 'react';
import { Chip } from '@mui/material';

interface Props {
  time: string;
  patientId: string;
  onDelete: (time: string) => void;
  onClick: (patientId: string) => void;
}

const chipSX = {
  '&:hover': {
    backgroundColor: '#1de9b6 !important',
  },
  cursor: 'pointer',
};

const Timechip = ({ time, patientId, onDelete, onClick }: Props) => {
  return (
    <Chip
      label={time}
      variant='outlined'
      onDelete={() => onDelete(time)}
      onClick={() => onClick(patientId)}
      sx={chipSX}
    />
  );
};

export default Timechip;
