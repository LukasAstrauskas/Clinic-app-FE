import React, { FC, useState } from 'react';
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
  UserSizeState,
  fetchAdminAmount,
  fetchPatientAmount,
  fetchPhysicianAmount,
} from '../../store/slices/userSize/userSizeSlice';
import { fetchMorePatients } from '../../store/slices/patient/patientSlice';
import { fetchMoreAdmins } from '../../store/slices/admin/adminSlice';
import { fetchMorePhysicians } from '../../store/slices/physician/physicianSlice';

interface Props {
  user: UniversalUser[];
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  more: boolean;
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

const TableBodyComponent: FC<Props> = ({
  user,
  handleChecked,
  refresh,
  setRefresh,
  more,
  setMore,
  type,
}) => {
  const UserSize = useSelector(UserSizeState);
  const dispatch = useDispatch<AppDispatch>();
  const [currentRender, setCurrentRender] = useState(7);

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
          {user.map((user, index) => (
            <TableRow
              key={index}
              sx={{
                width: '100%',
                bgcolor: '#d3d3d3',
              }}
            >
              <TableCell>
                <Checkbox
                  id={user.id.toString()}
                  onChange={() => handleChecked}
                />
              </TableCell>
              <TableCell sx={{ width: '200px' }}>{user.name}</TableCell>
              <TableCell align='center' sx={{ width: '200px' }}>
                {type === 'physician' ? user.occupation?.name : user.email}
              </TableCell>
              <TableCell>
                <IconButton color='primary'>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </InfiniteScroll>
      </TableBody>{' '}
    </>
  );
};

export default TableBodyComponent;
