import React, { FC } from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
interface Props {
  handleDelete: () => void;
  collumName: string;
}

const TableHeadComponent: FC<Props> = ({ handleDelete, collumName }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            bgcolor: '#d3d3d3',
            Width: '10px',
          }}
        >
          {' '}
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ color: 'orange' }} />
          </IconButton>{' '}
        </TableCell>
        <TableCell
          sx={{
            bgcolor: '#d3d3d3',
            fontWeight: '700',
            Width: '40%',
          }}
        >
          Name
        </TableCell>
        <TableCell
          sx={{
            bgcolor: '#d3d3d3',
            fontWeight: '700',
            Width: '40%',
          }}
          align='center'
        >
          {collumName}
        </TableCell>
        <TableCell
          sx={{
            bgcolor: '#d3d3d3',
          }}
        />
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
