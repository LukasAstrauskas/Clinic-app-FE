import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Chip } from '@mui/material';
import { red, teal } from '@mui/material/colors';
import TimechipPopper from './TimechipPopper';
import { fetchUserById } from '../../store/slices/user/userSlice';
import { Timeslot } from '../../model/Model';
import { selectLoggedUserType } from '../../store/slices/loggedUser/loggedUserSlice';

interface Props {
  timeslot: Timeslot;
  date: string;
  time: string;
  patientId: string;
  selected: boolean;
  onDelete?: (date: string, time: string, patientId: string) => void;
  onClick: (timeslot: Timeslot) => void;
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
  timeslot,
  date,
  time,
  patientId,
  selected,
  onDelete,
  onClick,
  onCancelAppointment,
}: Props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const type = useAppSelector(selectLoggedUserType);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isInFuture = new Date() > new Date(`${date}T${time}`);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick(timeslot);
    console.log(
      patientId,
      patientId && (type === 'admin' || type === 'physician')
        ? 'TRUE'
        : 'FALSE',
    );
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
        onClick={() => onClick(timeslot)}
        sx={patientId === null ? freeTimeSX(selected) : bookedTimeSX}
      />
    );
  }
};

export default Timechip;
