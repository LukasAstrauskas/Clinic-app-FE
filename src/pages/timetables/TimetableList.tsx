import React, { useContext, useEffect, useState } from 'react';
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
import { Timeslot, Timeslots } from '../../model/Model';
import axios from 'axios';
import { getWeekDay } from '../../components/utils';
import { deleteTimeslot } from '../../data/fetch';
import AlertModal from '../../components/modals/AlertModal';
import useToggle from '../../hooks/useToggle';
import AppointmentContext from '../../hooks/AppointmentContext';
import { grey, teal } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { selectId, selectType } from '../../store/slices/auth/authSlice';

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
  const type = useSelector(selectType);

  const loggedInUserId = useSelector(selectId);

  const [timeslot, setTimeslot] = useState<Timeslot>({
    physicianId: '',
    date: '',
    time: '',
  });

  const { appointment, setAppointment } = useContext(AppointmentContext);

  const handleOpenModal = (date: string): void => {
    setOpenModal();
    setTimeslot({ ...timeslot, date: date, time: '' });
  };

  const deleteButtonAction = (
    date: string,
    time: string,
    patientId: string,
  ): void => {
    if (patientId === null) {
      setTimeslot({ ...timeslot, date: date, time: time });
      setOpenConfirm();
    } else {
      toggleAlert();
    }
  };

  const handleDeleteTimeslot = (): void => {
    deleteTimeslot(timeslot);
    setloadData();
    setOpenConfirm();
  };

  const handleChipClick = (
    date: string,
    time: string,
    patientId: string,
  ): void => {
    {
      patientId === null &&
        setTimeslot({ ...timeslot, date: date, time: time });
    }
    {
      patientId === null &&
        setAppointment({
          ...appointment,
          date: date,
          time: time,
        });
    }
    setloadData();
  };

  const isSelected = (physicianId: string, date: string, time: string) => {
    return (
      physicianId === timeslot.physicianId &&
      date === timeslot.date &&
      time === timeslot.time
    );
  };
  useEffect(() => {
    setAppointment((appointment) => {
      if (type === 'patient' || loggedInUserId) {
        return {
          ...appointment,
          patientId: loggedInUserId || '',
          physicianId: physicianId,
          date: '',
          time: '',
        };
      } else {
        return {
          ...appointment,
          physicianId: physicianId,
          date: '',
          time: '',
        };
      }
    });
    setTimeslot({ physicianId: physicianId, date: '', time: '' });
    // eslint-disable-next-line
  }, [physicianId]);

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
    // eslint-disable-next-line
  }, [loadData, physicianId]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          size='small'
          aria-label='a dense table'
          sx={{
            backgroundColor: grey[200],
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
                  sx={{ backgroundColor: teal['A400'] }}
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
                        <>
                          {appointment.physicianId ? (
                            <Timechip
                              date={date}
                              time={time}
                              patientId={patientId}
                              onClick={handleChipClick}
                              key={time}
                              selected={isSelected(physicianId, date, time)}
                            />
                          ) : (
                            <Timechip
                              date={date}
                              time={time}
                              patientId={patientId}
                              onDelete={deleteButtonAction}
                              onClick={handleChipClick}
                              key={time}
                              selected={isSelected(physicianId, date, time)}
                            />
                          )}
                        </>
                      );
                    })}
                    {!appointment.physicianId && (
                      <Chip
                        label='+ NEW'
                        sx={{ backgroundColor: teal['A400'] }}
                        onClick={() => handleOpenModal(date)}
                      />
                    )}
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
        date={timeslot.date}
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
