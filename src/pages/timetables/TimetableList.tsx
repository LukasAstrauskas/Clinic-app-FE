import React, { useState } from 'react';
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

type Props = {
  physicianId: string;
  timeslots: Timeslots[];
};

const TimetableList = ({ physicianId, timeslots }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  // const [physicianID, setPhysicianID] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = (date: string): void => {
    setOpen(true);
    setDate(date);
  };

  const handleChipDelete = (time: string): void => alert(`Delete: ${time}!`);
  const handleChipClick = (patientId: string): void =>
    alert(`Patient ID: ${patientId}`);

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
              <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
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
                    label={date}
                  ></Chip>
                </TableCell>
                <TableCell align='left'>
                  <Stack direction='row' spacing={'0.4%'}>
                    {timePatientList.map(({ time, patientId }) => {
                      return (
                        <Timechip
                          time={time}
                          patientId={patientId}
                          onDelete={handleChipDelete}
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
        openModal={open}
        closeModal={handleCloseModal}
        id={physicianId}
        date={date}
      />
    </>
  );
};

export default TimetableList;
