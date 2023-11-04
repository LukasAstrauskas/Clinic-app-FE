import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { User } from '../../model/Model';
import { grey } from '@mui/material/colors';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  fetchMorePhysicians,
  selectPhysician,
  selectPhysicians,
  setPhysician,
} from '../../store/slices/physician/physicianSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchPhysicianAmount,
  selectUserSize,
} from '../../store/slices/userSize/userSizeSlice';
import { getUsers } from '../../store/slices/user/userActios';

type Props = {
  isSearch: boolean;
};

export const tableRowSX = (isSelected: boolean) => {
  return {
    backgroundColor: isSelected ? '#f5cec2 !important' : 'none',
    '&:hover': {
      backgroundColor: '#f5cec2 !important',
    },
    cursor: 'pointer',
  };
};

const PhysicianTable = ({ isSearch }: Props) => {
  const userSize = useAppSelector(selectUserSize);
  const physicians = useAppSelector(selectPhysicians);
  const selectedPhysician = useAppSelector(selectPhysician);
  const dispatch = useAppDispatch();

  const rowClick = (physician: User) => {
    dispatch(setPhysician(physician));
  };

  const getMoreData = async () => {
    if (!isSearch) {
      await dispatch(fetchMorePhysicians(physicians.length));
    }
  };

  useEffect(() => {
    dispatch(fetchPhysicianAmount());
    dispatch(getUsers({}));
  }, []);

  return (
    <div id='scrollBox' style={{ maxHeight: 375, overflowY: 'scroll' }}>
      <TableContainer component={Paper}>
        <InfiniteScroll
          scrollableTarget='scrollBox'
          dataLength={physicians.length}
          next={getMoreData}
          hasMore={userSize > physicians.length}
          loader={
            !isSearch && (
              <Typography
                variant='h5'
                sx={{ textAlign: 'center', backgroundColor: grey[200] }}
              >
                loading...
              </Typography>
            )
          }
        >
          <Table
            aria-label='simple table'
            size='small'
            sx={{
              backgroundColor: grey[200],
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Occupation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {physicians.map((physician) => (
                <TableRow
                  key={physician.id}
                  hover
                  sx={tableRowSX(selectedPhysician.id === physician.id)}
                  onClick={() => rowClick(physician)}
                >
                  <TableCell>
                    {physician.name} {physician.surname}
                  </TableCell>
                  <TableCell>{physician.occupation?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </div>
  );
};

export default PhysicianTable;
