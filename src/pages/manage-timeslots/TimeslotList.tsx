import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Timechip from '../book-appointment/Timechip';
import { Chip, Stack } from '@mui/material';
import TimeslotModal from '../../components/modals/TimeslotModal';
import TimeslotSetDateModal from '../../components/modals/TimeslotSetDateModal';
import { Timeslot } from '../../model/Model';
import { getWeekDay } from '../../components/utils';
import AlertModal from '../../components/modals/AlertModal';
import useToggle from '../../hooks/useToggle';
import { grey, teal } from '@mui/material/colors';
// import { selectId, selectType } from '../../store/slices/auth/authSlice';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeslots } from '../../store/slices/timeslot/timeslotSlice';
import MonthPicker from '../book-appointment/MonthPicker';
import {
  deleteTimeslot,
  getTimeslots,
} from '../../store/slices/timeslot/timeslotActions';

type Props = {
  physicianId: string;
};

const TimeslotList = ({ physicianId }: Props) => {
  const deleteMessage = 'Are you sure you want to delete this timeslot?';
  const [openModal, setOpenModal] = useToggle();
  const [openNewDateTimeModal, setOpenNewDateTimeModal] = useToggle();
  const [openNewDateModal, setOpenNewDateModal] = useToggle();
  const [openConfirm, setOpenConfirm] = useToggle();
  const [openAlert, toggleAlert] = useToggle();
  const [loadData, setLoadData] = useToggle();
  // const type = useAppSelector(selectType);
  const dispatch = useAppDispatch();
  // const loggedInUserId = useAppSelector(selectId);
  const [date, setDate] = useState('');

  const timeslots = useAppSelector(selectTimeslots);

  const [timeslot, setTimeslot] = useState<Timeslot>({
    id: '',
    physicianId: '',
    date: '',
    patientId: '',
  });

  const [pickDate, setPickDate] = useState<Dayjs>(dayjs().date(1));

  const handleOpenModal = (date: string): void => {
    setOpenModal();
    setTimeslot({ ...timeslot, date: date });
    setDate('');
  };

  const handleNewDateButton = () => {
    setOpenNewDateModal();
    if (!openNewDateTimeModal) setOpenNewDateTimeModal();
  };

  const deleteButtonAction = (timeslot: Timeslot) => {
    if (timeslot.patientId === null) {
      setTimeslot(timeslot);
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

  const handleChipClick = (timeslot: Timeslot): void => {
    setTimeslot(timeslot);
    // {
    //   patientId === null &&
    //     setAppointment({
    //       ...appointment,
    //       date: date,
    //       time: time,
    //     });
    // }
  };

  const isSelected = (id: string) => {
    return id === timeslot.id;
  };

  useEffect(() => {
    // setAppointment((appointment) => {
    //   return {
    //     ...appointment,
    //     patientId: type === 'patient' ? loggedInUserId : undefined,
    //     physicianId: physicianId,
    //     date: '',
    //     time: '',
    //   };
    // });
    setTimeslot({ ...timeslot, physicianId: physicianId });
  }, [physicianId]);

  useEffect(() => {
    dispatch(
      getTimeslots({
        id: physicianId,
        date: pickDate,
      }),
    );
  }, [loadData, physicianId, pickDate]);

  useEffect(() => {
    setPickDate(dayjs().date(1));
  }, [physicianId]);

  const renderAddNewTimeslotButton = (date: string) =>
    dayjs(date).endOf('day').isAfter(dayjs()) && (
      <Chip
        label='+ NEW'
        sx={{ backgroundColor: teal['A400'], mt: 0.5 }}
        onClick={() => handleOpenModal(date)}
      />
    );

  const renderAddNewDateButton = () => {
    return (
      <Chip
        label='+ New Date'
        sx={{ fontWeight: 'normal', backgroundColor: teal['A400'] }}
        onClick={handleNewDateButton}
      />
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
                <>Manage timeslots</>
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
            {timeslots.length !== 0 ? (
              <>
                {timeslots.map(({ date, timeslots }) => (
                  <TableRow
                    key={date}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{ backgroundColor: teal['A400'] }}
                      key={`Date${date}`}
                    >
                      <Chip
                        variant='outlined'
                        sx={{ border: 'unset' }}
                        label={`${date} ${getWeekDay(date)}`}
                      ></Chip>
                    </TableCell>

                    <TableCell align='left' key={`Stack${date}`}>
                      <Stack direction='row' style={{ flexWrap: 'wrap' }}>
                        {timeslots.map((timeslot) => {
                          return (
                            <Timechip
                              timeslot={timeslot}
                              date={date}
                              onDelete={deleteButtonAction}
                              onClick={handleChipClick}
                              key={timeslot.id}
                              selected={isSelected(timeslot.id)}
                            />
                          );
                        })}
                        {renderAddNewTimeslotButton(date)}
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

export default TimeslotList;
