import React, { useEffect, useState, FC } from 'react';
import { TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditUserModal from '../modals/EditUserModal';

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
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const handleOpen = () => {
    setOpen(true);
    // setSelectedId(user.id.toString());
  };

  // console.log(selectedId);

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
              <IconButton color='primary' onClick={handleOpen}>
                <EditIcon
                  onClick={() => {
                    setSelectedId(user.id);
                  }}
                />
              </IconButton>
              <EditUserModal
                setOpen={setOpen}
                open={open}
                selectedId={user.id}
                // selectedId={selectedId}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableBodyComponent;
