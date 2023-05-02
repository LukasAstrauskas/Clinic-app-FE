import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddAdminModal from '../../components/modals/AddAdminModal';
import Styles from '../../components/styles/UserManagmentStyles';
import TableHeadComponent from '../../components/tableComponents/HeadComponent';
import TableBodyComponent from '../../components/tableComponents/BodyComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAdmin,
  deleteAdmin,
  fetchAdmins,
  searchAdmin,
} from '../../store/slices/admin/adminSlice';
import { AppDispatch } from '../../store/types';

export const Admins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const admins = useSelector(selectAdmin);
  const [open, setOpen] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);
  const [checkedAdmins, setCheckedAdmins] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    checkedAdmins.forEach((admin) => {
      dispatch(deleteAdmin(admin));
    });
    setCheckedAdmins([]);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAdmin = e.target;
    if (selectedAdmin.checked) {
      setCheckedAdmins([...checkedAdmins, selectedAdmin.id]);
    } else {
      setCheckedAdmins(
        checkedAdmins.filter((patient) => patient !== selectedAdmin.id),
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    if (search.length != 0) {
      dispatch(searchAdmin(search));
      setMore(false);
    } else {
      dispatch(fetchAdmins());
      setRefresh(true);
    }
  };

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [open, checkedAdmins]);
  return (
    <>
      <Box
        sx={{
          width: 600,
          m: 'auto',
        }}
      >
        <SearchIcon sx={Styles.searchIcon} />
        <TextField
          onChange={handleSearch}
          sx={Styles.searchField}
          className='search'
          id='search'
          variant='outlined'
          placeholder='Search'
        />

        <Button
          onClick={handleOpen}
          sx={Styles.createNewUserBtn}
          variant='contained'
        >
          Create new
          <AddIcon />
        </Button>
      </Box>
      <AddAdminModal setOpen={setOpen} open={open} />

      <Box
        sx={{
          m: 'auto',
          width: 600,
        }}
      >
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHeadComponent
              handleDelete={handleDelete}
              collumName='email'
            />
          </Table>
          <Table>
            <TableBodyComponent
              type='admin'
              more={more}
              setMore={setMore}
              setRefresh={setRefresh}
              refresh={refresh}
              user={admins}
              handleChecked={handleChecked}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
