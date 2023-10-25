import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddAdminModal from '../../components/modals/AddAdminModal';
import Styles from '../../components/styles/UserManagmentStyles';
import TableHeadComponent from '../../components/manage-users-tables/TableHeadComponent';
import TableBodyComponent from '../../components/manage-users-tables/TableBodyComponent';
import {
  selectAdmin,
  fetchAdmins,
  searchAdmin,
} from '../../store/slices/admin/adminSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const Admins = () => {
  const dispatch = useAppDispatch();
  const admins = useAppSelector(selectAdmin);
  const [open, setOpen] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    if (search.length != 0) {
      dispatch(searchAdmin(search));
      setMore(false);
      setIsSearch(true);
    } else {
      setIsSearch(false);
      dispatch(fetchAdmins());
    }
  };

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
            <TableHeadComponent collumName='email' />
          </Table>

          <Table>
            <TableBodyComponent
              type='admin'
              more={more}
              setMore={setMore}
              userList={admins}
              isSearch={isSearch}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
