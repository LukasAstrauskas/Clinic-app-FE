import React, { FC, useState, useEffect } from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types';
import { UniversalUser } from '../../model/Model';
import {
  selectUserSize,
  fetchAdminAmount,
  fetchPatientAmount,
  fetchPhysicianAmount,
} from '../../store/slices/userSize/userSizeSlice';
import { fetchMorePatients } from '../../store/slices/patient/patientSlice';
import { fetchMoreAdmins } from '../../store/slices/admin/adminSlice';
import { fetchMorePhysicians } from '../../store/slices/physician/physicianSlice';
import EditUserModal from '../modals/EditUserModal';

interface Props {
  user: UniversalUser[];
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  more: boolean;
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  rowClick?: (id: string) => void;
}

const TableBodyComponent: FC<Props> = ({
  user,
  handleChecked,
  refresh,
  setRefresh,
  more,
  setMore,
  type,
  rowClick = () => undefined,
}) => {
  const UserSize = useSelector(selectUserSize);
  const dispatch = useDispatch<AppDispatch>();
  const [currentRender, setCurrentRender] = useState(7);
  const [selectedId, setSelectedId] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const getSize = () => {
    if (type === 'patient') {
      dispatch(fetchPatientAmount());
    }
    if (type === 'admin') {
      dispatch(fetchAdminAmount());
    }
    if (type === 'physician') {
      dispatch(fetchPhysicianAmount());
    }
  };

  const getMoreData = async () => {
    if (UserSize > currentRender) {
      if (type === 'patient') {
        dispatch(fetchMorePatients(currentRender));
      } else if (type === 'admin') {
        dispatch(fetchMoreAdmins(currentRender));
      } else if (type === 'physician') {
        dispatch(fetchMorePhysicians(currentRender));
      }
    } else {
      setMore(false);
    }
    setCurrentRender(user.length);
  };

  useEffect(() => {
    setRefresh(false);
    getSize();
    setMore(true);
    setCurrentRender(7);
  }, [refresh]);

  return (
    <>
      <TableBody
        id='scrollBox'
        style={{
          maxHeight: 400,
          overflow: 'auto',
          display: 'flex',
        }}
      >
        <InfiniteScroll
          scrollableTarget='scrollBox'
          dataLength={user.length}
          next={getMoreData}
          hasMore={more}
          loader={
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              loading...
            </Typography>
          }
        >
          <EditUserModal
            setOpen={setOpen}
            open={open}
            selectedId={selectedId}
          />
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
              <TableCell>
                <Checkbox id={id.toString()} onChange={handleChecked} />
              </TableCell>
              <TableCell onClick={() => rowClick(id)} sx={{ width: '200px' }}>
                {name}
              </TableCell>
              <TableCell align='center' sx={{ width: '200px' }}>
                {type === 'physician' ? occupation?.name : email}
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
        </InfiniteScroll>
      </TableBody>
    </>
  );
};

export default TableBodyComponent;
