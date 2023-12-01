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
  pickTimeslot,
  selectTimeslot,
} from '../../store/slices/timeslot/timeslotSlice';
import { ADMIN, PATIENT, PHYSICIAN } from '../../utils/Users';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUsers } from '../../store/slices/users/userActions';

type props = {
  users: User[];
  search: string;
  userType: typeof PATIENT | typeof PHYSICIAN | typeof ADMIN;
  onClick: (id: string) => void;
  selectedID: string;
  occupationId?: string;
};

const UserTable = ({
  users,
  search,
  userType,
  onClick,
  selectedID,
  occupationId = '',
}: props) => {
  const dispach = useAppDispatch();
  const offset = users.length;

  useEffect(() => {
    if (users.length === 0) {
      dispach(getUsers({ offset, userType }));
    }
  }, []);

  useEffect(() => {
    console.log(users);
  }, []);

  const occup = (occup: Occupation | null) => {
    return occup !== null ? occup?.name : 'No occup';
  };

  const colName = (type: string) => {
    return type === PATIENT ? 'Patient' : 'Occup';
  };

  const occupHeadCell = (
    <TableCell align='right' sx={{ fontWeight: 'bold' }}>
      Occupation
    </TableCell>
  );

  const occupBodyCell = (user: User) => (
    <TableCell align='right'>{user.occupation?.name}</TableCell>
  );
  return (
    <TableContainer
      component={Paper}
      id='scrollBox'
      sx={{
        backgroundColor: grey[200],
        marginTop: 2,
        // border: 2,
        height: 320,
        overflow: 'scroll',
      }}
    >
      {/* <Card sx={{ maxWidth: 350 }}>
        <CardContent>
          <Typography variant='body2'> ID {timeslot.id}</Typography>
          <Typography variant='body2'> Ph ID {timeslot.physicianId}</Typography>
          <Typography variant='body2'> Date {timeslot.date}</Typography>
          <Typography variant='body2'> Pat ID {timeslot.patientId}</Typography>
          <Typography variant='body2'> Lenght {patients.length}</Typography>
        </CardContent>
      </Card> */}

      <InfiniteScroll
        scrollableTarget='scrollBox'
        next={() => {
          console.log('fetch data');
          dispach(getUsers({ offset, search, userType, occupationId }));
        }}
        hasMore={true}
        loader={<></>}
        dataLength={offset}
      >
        <Table
          size='medium'
          aria-label='a dense table'
          sx={{
            // border: 2,
            minWidth: 420,
          }}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell sx={{ fontWeight: 'bold' }}>ID {selectedID}</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold' }}>NAME</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                SURNAME
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                EMAIL {users.length}
              </TableCell>
              {userType === PHYSICIAN && occupHeadCell}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={tableRowSX(user.id === selectedID)}
                hover
                onClick={() => onClick(user.id)}
              >
                {/* <TableCell>{patient.id}</TableCell> */}
                <TableCell>{user.name}</TableCell>
                <TableCell align='right'>{user.surname}</TableCell>
                <TableCell align='right'>{user.email}</TableCell>
                {userType === PHYSICIAN && occupBodyCell(user)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default UserTable;
