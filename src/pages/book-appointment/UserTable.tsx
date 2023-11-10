import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { tableRowSX } from '../../components/physician-table/PhysicianTable';
import { Occupation, User } from '../../model/Model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getPatients,
  selectPatients,
} from '../../store/slices/users/patientsSlice';
import {
  pickTimeslot,
  selectTimeslot,
} from '../../store/slices/timeslot/timeslotSlice';
import { PATIENT } from '../../utils/Users';

type tableProps = {
  data?: User[];
};

const UserTable = ({ data }: tableProps) => {
  const dispach = useAppDispatch();
  const timeslot = useAppSelector(selectTimeslot);
  const patients = useAppSelector(selectPatients);
  const [selectedID, setSelectedID] = useState('');

  console.log(data?.length);

  const rowClick = (id: string) => {
    setSelectedID(id);
    dispach(pickTimeslot({ ...timeslot, patientId: id }));
  };

  useEffect(() => {
    if (patients.length === 0) {
      dispach(getPatients({}));
    }
  }, []);

  useEffect(() => {
    console.log(patients);
  }, []);

  const occup = (occup: Occupation | null) => {
    return occup !== null ? occup?.name : 'No occup';
  };

  const colName = (type: string) => {
    return type === PATIENT ? 'Patient' : 'Occup';
  };

  const occupHeadCell = (
    <TableCell align='right' sx={{ fontWeight: 'bold' }}>
      {colName(PATIENT)}
    </TableCell>
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: grey[200],
        marginTop: 2,
      }}
    >
      <Card sx={{ maxWidth: 350 }}>
        <CardContent>
          <Typography variant='body2'> ID {timeslot.id}</Typography>
          <Typography variant='body2'> Ph ID {timeslot.physicianId}</Typography>
          <Typography variant='body2'> Date {timeslot.date}</Typography>
          <Typography variant='body2'> Pat ID {timeslot.patientId}</Typography>
        </CardContent>
      </Card>
      <Table
        size='small'
        aria-label='a dense table'
        sx={{
          minWidth: 420,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID {selectedID}</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              NAME
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              SURNAME
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              EMAIL
            </TableCell>
            {occupHeadCell}
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              sx={tableRowSX(patient.id === selectedID)}
              hover
              onClick={() => rowClick(patient.id)}
            >
              <TableCell>{patient.id}</TableCell>
              <TableCell align='right'>{patient.name}</TableCell>
              <TableCell align='right'>{patient.surname}</TableCell>
              <TableCell align='right'>{patient.email}</TableCell>
              <TableCell align='right'>{occup(patient.occupation)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
