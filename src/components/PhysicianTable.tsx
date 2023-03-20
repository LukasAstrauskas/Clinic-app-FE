import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeIcon from '@mui/icons-material/Mode';
import { Doctor } from '../data/doctorData';
import { Button } from '@mui/material';

type Props = {
  physicians: Doctor[];
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
          backgroundColor: '#eeeeee',
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
          {physicians.map(({ id, name, occupation }) => (
            <TableRow key={id} hover sx={tableRowSX}>
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
                {occupation}
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
    </TableContainer>
  );
};

export default PhysicianTable;
