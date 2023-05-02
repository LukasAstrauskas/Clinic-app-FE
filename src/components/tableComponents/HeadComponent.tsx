import React, { FC } from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
interface Props {
  handleDelete: () => void;
  collumName: string;
}

const TableHeadComponent: FC<Props> = ({ handleDelete, collumName }) => {
  const tableHeadName =
    collumName.charAt(0).toUpperCase() +
    collumName.substring(1, collumName.length);
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            backgroundColor: grey[200],
            width: '10%',
          }}
        >
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ color: 'orange' }} />
          </IconButton>{' '}
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: grey[200],
            fontWeight: '700',
            Width: '40%',
          }}
        >
          Name
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: grey[200],
            fontWeight: '700',
            Width: '40%',
          }}
          align='center'
        >
          {tableHeadName}
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: grey[200],
            width: '10%',
          }}
        />
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
