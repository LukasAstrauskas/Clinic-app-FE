import React, { FC } from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import { grey } from '@mui/material/colors';
interface Props {
  collumName: string;
  renderTableHeadCells?: boolean;
}

export const tableHeadSx = (isSelected: boolean) => {
  return {
    backgroundColor: grey[200],
    fontWeight: '700',
    Width: '40%',
    paddingLeft: isSelected ? 20 : 40,
  };
};

const TableHeadComponent: FC<Props> = ({
  collumName,
  renderTableHeadCells = true,
}) => {
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
            pl: 4,
          }}
        >
          Name
        </TableCell>
        <TableCell sx={tableHeadSx(renderTableHeadCells)}>
          {tableHeadName}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
