import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeIcon from '@mui/icons-material/Mode';
import { Button, Typography } from '@mui/material';
import { Physician } from '../../model/Model';
import { grey } from '@mui/material/colors';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPhysicians } from '../../store/slices/physician/physicianSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';

type Props = {
  physicians: Physician[];
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

const PhysicianTable = ({ physicians, selectedId, rowClick }: Props) => {
  const UserSize = 36;
  const dispatch = useDispatch<AppDispatch>();
  const [currentRender, setCurrentRender] = useState(5);
  const [more, setMore] = useState<boolean>(true);

  const fetchMoreData = async () => {
    if (UserSize > currentRender) {
      dispatch(fetchPhysicians());
      setCurrentRender(currentRender + 5);
    } else {
      setMore(false);
    }
  };

  return (
    <div style={{ maxHeight: 400, overflowY: 'scroll' }}>
      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={currentRender}
          next={fetchMoreData}
          hasMore={more}
          loader={
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              loading...
            </Typography>
          }
          endMessage={
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              No more items to display
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
                <TableRow
              key={id}
              hover
              sx={tableRowSX(selectedId === physicianId)}
            >
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
                    {occupation.name}
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
