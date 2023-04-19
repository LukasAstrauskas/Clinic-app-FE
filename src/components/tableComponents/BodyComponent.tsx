import React, { useEffect, useState, FC } from 'react';
import { TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditUserModal from '../modals/EditUserModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@mui/material/Typography';
import axios from 'axios';

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
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [more, setMore] = useState<boolean>(true);
  const [dbSize, setDBsize] = useState(0);
  const [currentSize, setCurrentSize] = useState(7);

  const handleOpen = () => {
    setOpen(true);
  };

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
  function getMoreData() {
    {
      axios
        .get(`http://localhost:8080/${endpoint}${currentSize}`, {
          headers: getRequestHeaders,
        })
        .then((res) => {
          if (dbSize + 1 > currentSize) {
            setUser(res.data);
          } else {
            setMore(false);
          }
        });
      setCurrentSize(currentSize + 1);
    }
  }
  useEffect(() => {
    setRefresh(false);
    getSize();
    setMore(true);
    setCurrentSize(8);
  }, [refresh]);
  return (
    <>
      <TableBody
        id='scrollBox'
        style={{
          maxHeight: 500,
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
                <Checkbox id={user.id.toString()} onChange={handleChecked} />
              </TableCell>
              <TableCell sx={{ width: '200px' }}>{user.name}</TableCell>
              <TableCell align='center' sx={{ width: '200px' }}>
                {collumValue === 'physician'
                  ? user.occupation.name
                  : user.email}
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
