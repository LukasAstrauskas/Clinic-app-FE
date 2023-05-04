import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeIcon from '@mui/icons-material/Mode';
import { Button, Typography } from '@mui/material';
import { UniversalUser } from '../../model/Model';
import { grey } from '@mui/material/colors';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMorePhysicians } from '../../store/slices/physician/physicianSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import {
  fetchPhysicianAmount,
  selectUserSize,
} from '../../store/slices/userSize/userSizeSlice';

type Props = {
  physicians: UniversalUser[];
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  more: boolean;
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: string | null;
  rowClick: (id: string) => void;
};

const tableRowSX = (isSelected: boolean) => {
  return {
    backgroundColor: isSelected ? '#ff9e80 !important' : 'none',
    '&:hover': {
      backgroundColor: '#ff9e80 !important',
    },
    cursor: 'pointer',
  };
};

const PhysicianTable = ({
  physicians,
  refresh,
  setRefresh,
  more,
  setMore,
  selectedId,
  rowClick,
}: Props) => {
  const UserSize = useSelector(selectUserSize);
  const dispatch = useDispatch<AppDispatch>();
  const [currentRender, setCurrentRender] = useState(5);

  const getMoreData = async () => {
    if (UserSize > currentRender) {
      await dispatch(fetchMorePhysicians(currentRender));
    } else {
      setMore(false);
    }
    setCurrentRender((prevRender) => prevRender + 5);
  };

  useEffect(() => {
    setRefresh(!false);
    setMore(more);
    setCurrentRender(7);
  }, [refresh]);

  useEffect(() => {
    dispatch(fetchPhysicianAmount());
  }, []);

  return (
    <div id='scrollBox' style={{ maxHeight: 300, overflowY: 'scroll' }}>
      <TableContainer component={Paper}>
        <InfiniteScroll
          scrollableTarget='scrollBox'
          dataLength={physicians.length}
          next={getMoreData}
          hasMore={more}
          loader={
            <Typography
              variant='h5'
              sx={{ textAlign: 'center', backgroundColor: grey[200] }}
            >
              loading...
            </Typography>
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
              {physicians.map(({ id, name, occupation }) => (
                <TableRow key={id} hover sx={tableRowSX(selectedId === id)}>
                  <TableCell
                    onClick={() => {
                      rowClick(id);
                    }}
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      rowClick(id);
                    }}
                  >
                    {occupation?.name}
                  </TableCell>
                  <TableCell sx={{ m: 0, p: 0 }}>
                    <Button
                      variant='text'
                      onClick={(event) => {
                        event.preventDefault();
                        console.log(`Id: ${id} edit.`);
                      }}
                    >
                      <ModeIcon />
                    </Button>
                  </TableCell>
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
