import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Timechip from './Timechip';
import { Chip, Stack } from '@mui/material';
import TimeslotModal from '../../components/modals/TimeslotModal';
import TimeslotSetDateModal from '../../components/modals/TimeslotSetDateModal';
import { Timeslot, Timeslots } from '../../model/Model';
import { getWeekDay } from '../../components/utils';
import AlertModal from '../../components/modals/AlertModal';
import useToggle from '../../hooks/useToggle';
import AppointmentContext from '../../hooks/AppointmentContext';
import { grey, teal } from '@mui/material/colors';
import { selectId, selectType } from '../../store/slices/auth/authSlice';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import { selectTimeslots } from '../../store/slices/timeslot/timeslotSlice';
import MonthPicker from './MonthPicker';

import {
  deletePatientFromTimeslot,
  deleteTimeslot,
  getTimeslot,
} from '../../store/slices/timeslot/timeslotActions';

type Props = {
  physicianId: string;
};

const TimetableList = ({ physicianId }: Props) => {
  const deleteMessage = 'Are you sure you want to delete this timeslot?';
  const [openModal, setOpenModal] = useToggle();
  const [openNewDateTimeModal, setOpenNewDateTimeModal] = useToggle();
  const [openNewDateModal, setOpenNewDateModal] = useToggle();
  const [openConfirm, setOpenConfirm] = useToggle();
  const [openAlert, toggleAlert] = useToggle();
  const [loadData, setLoadData] = useToggle();
  const type = useSelector(selectType);
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUserId = useSelector(selectId);
  const [date, setDate] = useState<string>('');
  const viewerType = sessionStorage.getItem('type');
  const selectedTimeslots: Timeslots[] = useSelector(selectTimeslots);
  let formatedTimeslot;
  if (viewerType === 'patient') {
    formatedTimeslot = selectedTimeslots.filter(({ date }) =>
      dayjs(date).isAfter(dayjs()),
    );
  } else {
    formatedTimeslot = selectedTimeslots;
  }

  const [timeslot, setTimeslot] = useState<Timeslot>({
    physicianId: '',
    date: '',
    time: '',
  });

  const { appointment, setAppointment } = useContext(AppointmentContext);

  const [pickDate, setPickDate] = useState<Dayjs>(dayjs().date(1));

  const handleOpenModal = (date: string): void => {
    setOpenModal();
    setTimeslot({ ...timeslot, date: date, time: '' });
    setDate('');
  };

  const handleNewDateButton = () => {
    setOpenNewDateModal();
    if (!openNewDateTimeModal) setOpenNewDateTimeModal();
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
    dispatch(deleteTimeslot(timeslot));
    setLoadData();
    setOpenConfirm();
  };

  const handleRemovePatientFromTimeslot = async (
    physicianId: string,
    date: string,
    time: string,
    patientId: string,
  ) => {
    const timeslot = {
      physicianId: physicianId,
      date,
      time,
      patientId: patientId,
    };
    dispatch(deletePatientFromTimeslot(timeslot));
    setLoadData();
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
      return {
        ...appointment,
        patientId: type === 'patient' ? loggedInUserId : undefined,
        physicianId: physicianId,
        date: '',
        time: '',
      };
    });
    setTimeslot({ physicianId: physicianId, date: '', time: '' });
  }, [physicianId]);

  useEffect(() => {
    dispatch(
      getTimeslot({
        id: physicianId,
        date: pickDate,
      }),
    );
  }, [loadData, physicianId, pickDate]);

  useEffect(() => {
    setPickDate(dayjs().date(1));
  }, [physicianId]);

  const renderAddNewTimeslotButton = ({ date }: { date: string }) => {
    return !appointment.physicianId &&
      dayjs(date).endOf('day').isAfter(dayjs()) ? (
      <Chip
        label='+ NEW'
        sx={{ backgroundColor: teal['A400'], mt: 0.5 }}
        onClick={() => handleOpenModal(date)}
      />
    ) : (
      <></>
    );
  };

  const renderAddNewDateButton = () => {
    return (
      !appointment.physicianId &&
      type === 'admin' && (
        <Chip
          label='+ New Date'
          sx={{ fontWeight: 'normal', backgroundColor: teal['A400'] }}
          onClick={handleNewDateButton}
        />
      )
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: grey[200],
          maxHeight: 420,
        }}
      >
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                colSpan={2}
                sx={{ backgroundColor: grey[200] }}
              >
                <MonthPicker date={pickDate} setDate={setPickDate} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  width: 130,
                  fontWeight: 'bold',
                  backgroundColor: grey[200],
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', backgroundColor: grey[200] }}
                align='left'
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  Time
                  {renderAddNewDateButton()}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formatedTimeslot.length !== 0 ? (
              <>
                {formatedTimeslot.map(({ date, timePatientList }) => (
                  <TableRow
                    key={`${date}${physicianId}`}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
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
                      <Stack direction='row' style={{ flexWrap: 'wrap' }}>
                        {timePatientList.map(({ time, patientId }) => {
                          return (
                            <>
                              {appointment.physicianId ? (
                                <Timechip
                                  date={date}
                                  time={time}
                                  patientId={patientId}
                                  onClick={handleChipClick}
                                  key={`${date}${time}${physicianId}`}
                                  selected={isSelected(physicianId, date, time)}
                                  onCancelAppointment={() =>
                                    handleRemovePatientFromTimeslot(
                                      physicianId,
                                      date,
                                      time,
                                      patientId,
                                    )
                                  }
                                />
                              ) : (
                                <Timechip
                                  date={date}
                                  time={time}
                                  patientId={patientId}
                                  onDelete={deleteButtonAction}
                                  onClick={handleChipClick}
                                  key={`${date}${time}${physicianId}`}
                                  selected={isSelected(physicianId, date, time)}
                                />
                              )}
                            </>
                          );
                        })}
                        {renderAddNewTimeslotButton({ date })}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow key={`${physicianId}`}>
                <TableCell colSpan={2} align='center'>
                  No work graphic this month!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TimeslotSetDateModal
        openModal={openNewDateModal}
        closeModal={setOpenNewDateModal}
        setDate={setDate}
      />
      <TimeslotModal
        openModal={openModal}
        closeModal={setOpenModal}
        loadData={setLoadData}
        id={physicianId}
        date={timeslot.date}
      />
      <TimeslotModal
        openModal={openNewDateTimeModal && !openNewDateModal && date !== ''}
        closeModal={setOpenNewDateTimeModal}
        loadData={setLoadData}
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
