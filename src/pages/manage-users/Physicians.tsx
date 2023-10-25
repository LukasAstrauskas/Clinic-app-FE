import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PhysicianModalContent from '../../components/modals/AddPhysicianModal';
import Styles from '../../components/styles/UserManagmentStyles';
import TableHeadComponent from '../../components/manage-users-tables/TableHeadComponent';
import TableBodyComponent from '../../components/manage-users-tables/TableBodyComponent';
import {
  selectPhysicians,
  fetchPhysicians,
  searchPhysician,
} from '../../store/slices/physician/physicianSlice';
import { fetchOccupations } from '../../store/slices/occupation/occupationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const Physicians = () => {
  const dispatch = useAppDispatch();
  const physicians = useAppSelector(selectPhysicians);
  const [more, setMore] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(fetchOccupations());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search.length != 0) {
      dispatch(searchPhysician({ search }));
      setMore(false);
      setIsSearch(true);
    } else {
      setIsSearch(false);
      dispatch(fetchPhysicians());
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
      <PhysicianModalContent setOpen={setOpen} open={open} />
      <Box
        sx={{
          m: 'auto',
          width: 600,
        }}
      >
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHeadComponent collumName='occupation' />
          </Table>

          <Table>
            <TableBodyComponent
              type='physician'
              more={more}
              setMore={setMore}
              userList={physicians}
              isSearch={isSearch}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
