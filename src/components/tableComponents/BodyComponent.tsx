import React, { useEffect, useState, FC } from 'react';
import { TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

type UserType = {
  id: string;
  name: string;
  email: string | number;
  occupation?:
    | {
        id?: string;
        name?: string;
      }
    | any;
};

interface Props {
  collumValue: string;
  user: UserType[];
  handleChecked: any;
}

const TableBodyComponent: FC<Props> = ({
  collumValue,
  user,
  handleChecked,
}) => {
  return (
    <>
      <TableBody>
        {user.map((user, index) => (
          <TableRow
            key={index}
            sx={{
              width: '100%',
              bgcolor: '#d3d3d3',
            }}
          >
            <TableCell>
              <Checkbox id={user.id.toString()} onChange={handleChecked} />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell align='center'>
              {collumValue === 'physician' ? user.occupation.name : user.email}
            </TableCell>
            <TableCell>
              <IconButton color='primary'>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableBodyComponent;
