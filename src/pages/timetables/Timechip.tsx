import React, { useState } from 'react';
import { AppDispatch } from '../../store/types';
import { Chip } from '@mui/material';
import { red, teal } from '@mui/material/colors';
import TimechipPopper from './TimechipPopper';
import { fetchUserById } from '../../store/slices/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectType } from '../../store/slices/auth/authSlice';

interface Props {
  date: string;
  time: string;
  patientId: string;
  selected: boolean;
  onDelete?: (date: string, time: string, patientId: string) => void;
  onClick: (date: string, time: string, patientId: string) => void;
  onCancelAppointment?: () => void;
}

const freeTimeSX = (selected: boolean) => {
  return {
    backgroundColor: selected ? teal['A400'] : 'none',
    mt: 0.5,
    mr: 0.5,
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
  mt: 0.5,
  mr: 0.5,
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
  onCancelAppointment,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const type = useSelector(selectType);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isInFuture = new Date() > new Date(`${date}T${time}`);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick(date, time, patientId);
    if (patientId && (type === 'admin' || type === 'physician')) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
      dispatch(fetchUserById(patientId));
    }
  };

  if (typeof onDelete === 'undefined') {
    return (
      <>
        <Chip
          label={time}
          variant='outlined'
          disabled={isInFuture}
          onClick={handleClick}
          sx={patientId === null ? freeTimeSX(selected) : bookedTimeSX}
        />
        <TimechipPopper
          patientId={patientId}
          open={open}
          setOpen={setOpen}
          anchorEl={anchorEl}
          onCancelAppointment={() =>
            onCancelAppointment && onCancelAppointment()
          }
        />
      </>
    );
  } else {
    return (
      <Chip
        label={time}
        variant='outlined'
        disabled={isInFuture}
        onDelete={() => onDelete(date, time, patientId)}
        onClick={() => onClick(date, time, patientId)}
        sx={patientId === null ? freeTimeSX(selected) : bookedTimeSX}
      />
    );
  }
};

export default Timechip;
