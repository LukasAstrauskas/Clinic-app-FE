import React, { useEffect, useState, FC } from 'react';
import { TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMorePatients,
  selectLimitedPatients,
} from '../../store/slices/patient/patientSlice';
import { AppDispatch } from '../../store/types';
import { UniversalUser, User } from '../../model/Model';

interface Props {
  collumValue: string;
  user: UniversalUser[];
  setUser: any;
  handleChecked: any;
  refresh: boolean;
  setRefresh: any;
  endpoint: string;
  sizeEndpoint: string;
}

const TableBodyComponent: FC<Props> = ({
  collumValue,
  user,
  setUser,
  handleChecked,
  refresh,
  setRefresh,
  endpoint,
  sizeEndpoint,
}) => {
  let try1;
  const [try2, setTry2] = useState<any[]>([]);
  const test = useSelector(selectLimitedPatients);
  const dispatch = useDispatch<AppDispatch>();
  const [more, setMore] = useState<boolean>(true);
  const [dbSize, setDBsize] = useState(0);
  const [currentRender, setCurrentRender] = useState(7);
  const getRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const getSize = () => {
    axios
      .get(`http://localhost:8080/${sizeEndpoint}`, {
        headers: getRequestHeaders,
      })
      .then((res) => setDBsize(res.data));
  };
  console.log('test');
  const handleInitialRender = () => {
    console.log('triggered');
    try1 = [...user];
    setTry2(try1);
  };

  setTimeout(() => {
    handleInitialRender;
  }, 1000);

  const getMoreData = async () => {
    setCurrentRender(try2.length);
    if (dbSize > currentRender) {
      console.log('called');
      try1 = [...try2, ...test];
      console.log(try1);
      setTry2(try1);
    } else {
      setMore(false);
    }
    dispatch(fetchMorePatients(currentRender));

    // } else {
    //   setMore(false);
    // }
    // setCurrentRender(user.length);
    // {
    //   axios
    //     .get(`http://localhost:8080/${endpoint}${currentRender}`, {
    //       headers: getRequestHeaders,
    //     })
    //     .then((res) => {
    //       if (dbSize >= currentRender) {
    //         setUser([...user, ...res.data]);
    //       } else {
    //         setMore(false);
    //       }
    //     });
    //   setCurrentSize(currentSize + 1);
    // }
  };

  useEffect(() => {
    dispatch(fetchMorePatients(currentRender));
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
          {try2.map((user, index) => (
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
              <TableCell sx={{ width: '200px' }}>{user.name}</TableCell>
              <TableCell align='center' sx={{ width: '200px' }}>
                {
                  // collumValue === 'physician'
                  // ? user.occupation.name
                  // :
                  user.email
                }
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
