import React, { FC } from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
interface Props {
  collumName: string;
}

const TableHeadComponent: FC<Props> = ({ collumName }) => {
  const tableHeadName =
    collumName.charAt(0).toUpperCase() +
    collumName.substring(1, collumName.length);
  return (
    <TableHead>
      <TableRow>
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
            paddingLeft: 22,
          }}
        >
          {tableHeadName}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
