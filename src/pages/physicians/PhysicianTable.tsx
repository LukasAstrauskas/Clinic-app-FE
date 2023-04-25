import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeIcon from '@mui/icons-material/Mode';
import { Button } from '@mui/material';
import { PhyNameOccupation } from '../../model/Model';
import { grey } from '@mui/material/colors';

type Props = {
  physicians: PhyNameOccupation[];
  rowClick: (id: string) => void;
};

const tableRowSX = {
  '&:hover': {
    backgroundColor: '#ff9e80 !important',
  },
  cursor: 'pointer',
};

const PhysicianTable = ({ physicians, rowClick }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 450 }}>
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {physicians.map(({ physicianId, name, occupation }) => (
            <TableRow key={physicianId} hover sx={tableRowSX}>
              <TableCell
                onClick={() => {
                  rowClick(physicianId);
                }}
              >
                {name}
              </TableCell>
              <TableCell
                onClick={() => {
                  rowClick(physicianId);
                }}
              >
                {occupation}
              </TableCell>
              <TableCell sx={{ m: 0, p: 0 }}>
                <Button
                  variant='text'
                  onClick={(event) => {
                    event.preventDefault();
                    console.log(`Id: ${physicianId} edit.`);
                  }}
                >
                  <ModeIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PhysicianTable;
