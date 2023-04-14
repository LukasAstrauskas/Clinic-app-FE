import React from 'react';
import { Chip } from '@mui/material';
import { red } from '@mui/material/colors';

interface Props {
  date: string;
  time: string;
  patientId: string;
  onDelete: (date: string, time: string, patientId: string) => void;
  onClick: (patientId: string) => void;
}

const freeTimeSX = {
  '&:hover': {
    backgroundColor: '#1de9b6 !important',
  },
  cursor: 'pointer',
  '& .MuiChip-deleteIcon': {
    '&:hover': {
      color: '#e57373 !important',
    },
  },
};

const bookedTimeSX = {
  backgroundColor: red[300],
  '&:hover': {
    backgroundColor: '#e57373 !important',
  },
  cursor: 'pointer',
  '& .MuiChip-deleteIcon': {
    disabled: true,
    color: red[300],
    '&:hover': {
      color: '#e57373 !important',
    },
  },
};

const Timechip = ({ date, time, patientId, onDelete, onClick }: Props) => {
  return (
    <Chip
      label={time}
      variant='outlined'
      onDelete={() => onDelete(date, time, patientId)}
      onClick={() => onClick(patientId)}
      sx={patientId === null ? freeTimeSX : bookedTimeSX}
    />
  );
};

export default Timechip;
