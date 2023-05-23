import React, { FC, useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { UniversalUser } from '../../model/Model';
import { tableRowSX } from '../../pages/physicians/PhysicianTable';
import {
  deleteAdmin,
  fetchAdmins,
  fetchMoreAdmins,
  resetAdminData,
} from '../../store/slices/admin/adminSlice';
import {
  deletePatient,
  fetchMorePatients,
  fetchMorePatientsByPhysicianId,
  fetchPatients,
  fetchPatientsByPhysicianId,
  resetPatientData,
} from '../../store/slices/patient/patientSlice';
import {
  deletePhysician,
  fetchMorePhysicians,
  fetchPhysicians,
  resetPhysicianData,
} from '../../store/slices/physician/physicianSlice';
import {
  fetchAdminAmount,
  fetchPatientAmount,
  fetchPatientsByPhysicianAmount,
  fetchPhysicianAmount,
  selectUserSize,
} from '../../store/slices/userSize/userSizeSlice';
import { AppDispatch } from '../../store/types';
import EditUserModal from '../modals/EditUserModal';
interface Props {
  user: UniversalUser[];
  more: boolean;
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  isSearch?: boolean;
  rowClick?: (id: string) => void;
  renderDelAndEditCells?: boolean;
}

export const tableRowSx = (isSelected: boolean) => {
  return {
    width: isSelected ? '200px' : '300px',
  };
};

const TableBodyComponent: FC<Props> = ({
  user,
  type,
  rowClick = () => undefined,
  isSearch,
  renderDelAndEditCells = true,
}) => {
  const userSize = useSelector(selectUserSize);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState('');
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const loggedInUserId = sessionStorage.getItem('userId');
  const loggedInUserType = sessionStorage.getItem('type');
  const [refresh, setRefresh] = useState(false);
  const scrollContainerRef = useRef<any>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (type === 'patient') {
      await dispatch(deletePatient(id));
      await dispatch(resetPatientData());
      await dispatch(fetchPatientAmount());
    }
    if (type === 'physician') {
      await dispatch(deletePhysician(id));
      await dispatch(resetPhysicianData());
      await dispatch(fetchPhysicianAmount());
    }
    if (type === 'admin') {
      await dispatch(deleteAdmin(id));
      await dispatch(resetAdminData());
      await dispatch(fetchAdminAmount());
    }
    setUsers(users.filter((user) => user != id));
  };

  const getMoreData = async () => {
    if (isSearch) {
      return;
    }
    if (loggedInUserType === 'physician') {
      dispatch(
        fetchMorePatientsByPhysicianId({
          id: loggedInUserId,
          offset: user.length,
        }),
      );
    } else {
      switch (type) {
        case 'patient':
          dispatch(fetchMorePatients(user.length));
          break;
        case 'admin':
          dispatch(fetchMoreAdmins(user.length));
          break;
        case 'physician':
          dispatch(fetchMorePhysicians(user.length));
          break;
      }
    }
  };
  const getSize = () => {
    if (loggedInUserType === 'physician') {
      dispatch(fetchPatientsByPhysicianAmount({ id: loggedInUserId }));
    } else {
      switch (type) {
        case 'patient':
          dispatch(fetchPatientAmount());
          break;
        case 'admin':
          dispatch(fetchAdminAmount());
          break;
        case 'physician':
          dispatch(fetchPhysicianAmount());
          break;
      }
    }
  };

  useEffect(() => {
    getSize();
  }, []);

  useEffect(() => {
    scrollContainerRef.current.scrollTo(0, 0);
    if (loggedInUserType === 'physician') {
      dispatch(fetchPatientsByPhysicianId({ id: loggedInUserId }));
    } else {
      switch (type) {
        case 'patient':
          dispatch(fetchPatients());
          break;
        case 'physician':
          dispatch(fetchPhysicians());
          break;
        case 'admin':
          dispatch(fetchAdmins());
          break;
      }
    }
  }, [users, refresh]);

  return (
    <TableBody
      ref={scrollContainerRef}
      id='scrollBox'
      style={{
        maxHeight: 400,
        overflow: 'auto',
        display: 'flex',
      }}
      sx={{ backgroundColor: grey[200] }}
    >
      <TableRow>
        <TableCell>
          <InfiniteScroll
            scrollableTarget='scrollBox'
            dataLength={user.length}
            next={getMoreData}
            hasMore={userSize > user.length}
            loader={
              !isSearch && (
                <Typography variant='h5' sx={{ textAlign: 'center' }}>
                  loading...
                </Typography>
              )
            }
          >
            <EditUserModal
              setOpen={setOpen}
              open={open}
              selectedId={selectedId}
              refresh={refresh}
              setRefresh={setRefresh}
            />
            <Table>
              <TableBody>
                {user.map(({ id, name, email, occupation }) => (
                  <TableRow key={id} hover sx={tableRowSX(selectedId === id)}>
                    <TableCell
                      sx={tableRowSx(renderDelAndEditCells)}
                      onClick={() => {
                        rowClick(id);
                        setSelectedId(id);
                      }}
                    >
                      {name}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ width: '200px' }}
                      onClick={() => rowClick(id)}
                    >
                      {type === 'physician' ? occupation?.name : email}
                    </TableCell>
                    {renderDelAndEditCells && (
                      <>
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
                        <TableCell>
                          <IconButton
                            color='primary'
                            onClick={() => handleDelete(id)}
                          >
                            <DeleteIcon sx={{ color: 'orange' }} />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableBodyComponent;
