import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Chip } from '@mui/material';
import { red, teal } from '@mui/material/colors';
import TimechipPopper from './TimechipPopper';
import { fetchUserById } from '../../store/slices/manage-users/userSlice';
import { Timeslot } from '../../model/Model';
import { selectLoggedUserType } from '../../store/slices/loggedUser/loggedUserSlice';
import dayjs from 'dayjs';
import useToggle from '../../hooks/useToggle';

interface Props {
  timeslot: Timeslot;
  date: string;
  selected: boolean;
  onDelete?: (timeslot: Timeslot) => void;
  onClick: (timeslot: Timeslot) => void;
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

const Timechip = ({ timeslot, date, selected, onDelete, onClick }: Props) => {
  const dispatch = useAppDispatch();
  // const [isOpen, switchOpen] = useState(false);
  const [isOpen, switchOpen] = useToggle();
  const type = useAppSelector(selectLoggedUserType);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const time = dayjs(timeslot.date).format('HH:mm');
  const isInFuture = new Date() > new Date(`${date}T${time}`);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick(timeslot);
    if (timeslot.patientId && (type === 'admin' || type === 'physician')) {
      setAnchorEl(event.currentTarget);
      switchOpen();
      dispatch(fetchUserById(timeslot.patientId));
    }
  };

  const timeChip =
    onDelete === undefined ? (
      <Chip
        label={time}
        variant='outlined'
        disabled={isInFuture}
        onClick={handleClick}
        sx={!timeslot.patientId ? freeTimeSX(selected) : bookedTimeSX}
      />
    ) : (
      <Chip
        label={time}
        variant='outlined'
        disabled={isInFuture}
        onDelete={onDelete}
        onClick={handleClick}
        sx={!timeslot.patientId ? freeTimeSX(selected) : bookedTimeSX}
      />
    );

  // if (onDelete === undefined) {
  return (
    <>
      {timeChip}
      <TimechipPopper
        patientId={timeslot.patientId}
        timeslotId={timeslot.id}
        open={isOpen}
        switchOpen={switchOpen}
        anchorEl={anchorEl}
      />
    </>
  );
  // } else {
  //   return (
  //     <>
  //       <Chip
  //         label={time}
  //         variant='outlined'
  //         disabled={isInFuture}
  //         onDelete={onDelete}
  //         onClick={handleClick}
  //         sx={!timeslot.patientId ? freeTimeSX(selected) : bookedTimeSX}
  //       />
  //       <TimechipPopper
  //         patientId={timeslot.patientId}
  //         timeslotId={timeslot.id}
  //         open={open}
  //         setOpen={setOpen}
  //         anchorEl={anchorEl}
  //       />
  //     </>
  //   );
  // }
};

export default Timechip;
