import React, { FC, useState } from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditUserModal from '../modals/EditUserModal';

type UserType = {
  id: string;
  name: string;
  email: string;
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
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rowClick?: (id: string) => void;
}

const TableBodyComponent: FC<Props> = ({
  collumValue,
  user,
  handleChecked,
  rowClick = () => undefined,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <TableBody>
        <EditUserModal setOpen={setOpen} open={open} selectedId={selectedId} />
        {user.map(({ id, name, email, occupation }) => (
          <TableRow
            key={id}
            sx={{
              '&:hover': {
                backgroundColor: '#ff9e80 !important',
              },
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <TableCell sx={{ my: 0, py: 0 }}>
              <Checkbox id={id} onChange={handleChecked} />
            </TableCell>
            <TableCell onClick={() => rowClick(id)}>{name}</TableCell>
            <TableCell align='center' onClick={() => rowClick(id)}>
              {collumValue === 'physician' ? occupation.name : email}
            </TableCell>

            <TableCell
              sx={{ m: 0, p: 0 }}
              onClick={() => {
                setSelectedId(id);
              }}
            >
              <IconButton color='primary' onClick={handleOpen}>
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
