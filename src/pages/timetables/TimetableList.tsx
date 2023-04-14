import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Timechip from './Timechip';
import { Stack } from '@mui/system';
import { Chip } from '@mui/material';
import TimeslotModal from '../../components/modals/TimeslotModal';
import { Timeslots } from '../../model/Model';
import axios from 'axios';
import { getWeekDay } from '../../components/utils';
import { deleteTimeslot } from '../../data/fetch';
import AlertModal from '../../components/modals/AlertModal';
import useToggle from '../../hooks/useToggle';

type Props = {
  physicianId: string;
};

const TimetableList = ({ physicianId }: Props) => {
  const timeslotsURL = 'http://localhost:8080/timeslot/getPhyTimeslots/';
  const deleteMessage = 'Are you sure you want to delete this timeslot?';
  const [openModal, setOpenModal] = useToggle();
  const [openConfirm, setOpenConfirm] = useToggle();
  const [openAlert, toggleAlert] = useToggle();
  const [loadData, setloadData] = useToggle();
  const [timeslots, setTimeslots] = useState<Timeslots[]>([]);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const handleOpenModal = (date: string): void => {
    setOpenModal();
    setDate(date);
  };

  const deleteButtonAction = (
    date: string,
    time: string,
    patientId: string,
  ): void => {
    if (patientId === null) {
      setDate(date);
      setTime(time);
      setOpenConfirm();
    } else {
      toggleAlert();
    }
  };

  const handleDeleteTimeslot = (): void => {
    deleteTimeslot({ physicianId, date, time });
    setloadData();
    setOpenConfirm();
  };

  const handleChipClick = (patientId: string): void =>
    alert(`Patient ID: ${patientId}`);

  useEffect(() => {
    async function getTimeslots() {
      await axios
        .get<Timeslots[]>(`${timeslotsURL}${physicianId}`)
        .then((response) => {
          const list = response.data;
          setTimeslots(list);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTimeslots();
    // eslint-disable-next-line prettier/prettier
  }, [loadData, physicianId]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          size='small'
          aria-label='a dense table'
          sx={{
            backgroundColor: '#eeeeee',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 130, fontWeight: 'bold' }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align='left'>
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeslots.map(({ date, timePatientList }) => (
              <TableRow
                key={date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  sx={{ backgroundColor: '#1de9b6' }}
                >
                  <Chip
                    variant='outlined'
                    sx={{ border: 'unset' }}
                    label={`${date} ${getWeekDay(date)}`}
                  ></Chip>
                </TableCell>
                <TableCell align='left'>
                  <Stack direction='row' spacing={'0.4%'}>
                    {timePatientList.map(({ time, patientId }) => {
                      return (
                        <Timechip
                          date={date}
                          time={time}
                          patientId={patientId}
                          onDelete={deleteButtonAction}
                          onClick={handleChipClick}
                          key={time}
                        />
                      );
                    })}
                    <Chip
                      label='+ NEW'
                      sx={{ backgroundColor: '#1de9b6' }}
                      onClick={() => handleOpenModal(date)}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TimeslotModal
        openModal={openModal}
        closeModal={setOpenModal}
        loadData={setloadData}
        id={physicianId}
        date={date}
      />
      <AlertModal
        open={openConfirm}
        onClose={setOpenConfirm}
        message={deleteMessage}
        onConfirm={handleDeleteTimeslot}
        confirmMsg='Delete'
        closeMsg='Cancel'
      />
      <AlertModal
        open={openAlert}
        onClose={toggleAlert}
        message='This time slot is already booked and cannot be deleted'
        closeMsg='Ok, close.'
      />
    </>
  );
};

export default TimetableList;
