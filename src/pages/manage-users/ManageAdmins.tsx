import React from 'react';
import { ADMIN } from '../../utils/Users';
import { Box, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import UserSearchBar from '../book-appointment/UserSearchBar';
import UserTable from '../book-appointment/UserTable';
import { getUsers } from '../../store/slices/users/userActions';
import {
  clearAdmins,
  selectAdminId,
  selectAdminSearch,
  selectAdmins,
  setAdminID,
  setAdminsSearch,
} from '../../store/slices/users/adminsSlice';

const ManageAdmins = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectAdminSearch);

  const onSearch = (search: string, userType: string) => {
    dispatch(setAdminsSearch(search));
    dispatch(clearAdmins());
    dispatch(
      getUsers({
        search,
        userType,
      }),
    );
  };
  const admin = ADMIN;

  const admins = useAppSelector(selectAdmins);

  function rowClick(id: string): void {
    dispatch(setAdminID(id));
  }

  const selectedID = useAppSelector(selectAdminId);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack>
        <UserSearchBar
          onSearch={onSearch}
          userType={admin}
          searchState={search}
          addButton
        />
        <UserTable
          userType={admin}
          users={admins}
          search={search}
          onClick={rowClick}
          selectedID={selectedID}
          renderEditButtons
        />
      </Stack>
    </Box>
  );
};

export default ManageAdmins;
