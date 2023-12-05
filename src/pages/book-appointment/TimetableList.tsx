import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Timechip from '../../components/timeslot-table/Timechip';
import { Chip, Stack } from '@mui/material';
import { Timeslot } from '../../model/Model';
import { getWeekDay } from '../../components/utils';
import { grey, teal } from '@mui/material/colors';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  pickTimeslot,
  selectTimeslot,
  selectTimeslots,
} from '../../store/slices/timeslot/timeslotSlice';
import MonthPicker from '../../components/timeslot-table/MonthPicker';
import { getTimeslots } from '../../store/slices/timeslot/timeslotActions';

type Props = {
  physicianId: string;
};

const TimetableList = ({ physicianId }: Props) => {
  const dispatch = useAppDispatch();
  const groupedTimeslots = useAppSelector(selectTimeslots);

  const pickedTimeslot = useAppSelector(selectTimeslot);

  const [pickDate, setPickDate] = useState<Dayjs>(dayjs().date(1));

  const handleChipClick = (timeslot: Timeslot) => {
    if (!timeslot.patientId) {
      dispatch(
        pickTimeslot({
          ...pickedTimeslot,
          id: timeslot.id,
          physicianId: timeslot.physicianId,
          date: timeslot.date,
        }),
      );
    } else {
      dispatch(
        pickTimeslot({
          ...pickedTimeslot,
          id: '',
          physicianId: '',
          date: '',
        }),
      );
    }
  };

  useEffect(() => {
    console.log('Timeslots list state changed');
  }, [groupedTimeslots]);

  const isSelected = (id: string) => {
    return id === pickedTimeslot.id;
  };

  useEffect(() => {
    dispatch(
      getTimeslots({
        id: physicianId,
        date: pickDate,
      }),
    );
  }, [physicianId, pickDate]);

  useEffect(() => {
    setPickDate(dayjs().date(1));
  }, [physicianId]);

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
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedTimeslots.length > 0 ? (
              <>
                {groupedTimeslots.map(({ date, timeslots }) => (
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
                              onClick={handleChipClick}
                              key={timeslot.id}
                              selected={isSelected(timeslot.id)}
                            />
                          );
                        })}
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
    </>
  );
};

export default TimetableList;
