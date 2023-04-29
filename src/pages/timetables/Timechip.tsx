import React from 'react';
import { Chip } from '@mui/material';
import { red, teal } from '@mui/material/colors';

interface Props {
  date: string;
  time: string;
  patientId: string;
  selected: boolean;
  onDelete?: (date: string, time: string, patientId: string) => void;
  onClick: (date: string, time: string, patientId: string) => void;
}

const freeTimeSX = (selected: boolean) => {
  return {
    backgroundColor: selected ? teal['A400'] : 'none',
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

const Timechip = ({
  date,
  time,
  patientId,
  selected,
  onDelete,
  onClick,
}: Props) => {
  if (typeof onDelete === 'undefined') {
    return (
      <Chip
        label={time}
        variant='outlined'
        onClick={() => {
          onClick(date, time, patientId);
        }}
        sx={patientId === null ? freeTimeSX(selected) : bookedTimeSX}
      />
    );
  } else {
    return (
      <Chip
        label={time}
        variant='outlined'
        onDelete={() => onDelete(date, time, patientId)}
        onClick={() => onClick(date, time, patientId)}
        sx={patientId === null ? freeTimeSX(selected) : bookedTimeSX}
      />
    );
  }
};

export default Timechip;
