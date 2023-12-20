import { Box, Stack } from '@mui/material';
import React from 'react';
import UserSearchBar from '../book-appointment/UserSearchBar';
import UserTable from '../book-appointment/UserTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PHYSICIAN } from '../../utils/Users';
import {
  clearPhysicians,
  selectOccupationId,
  selectPhysicianId,
  selectPhysicianSearch,
  selectPhysicians,
  setPhysicianID,
  setPhysicianSearch,
} from '../../store/slices/users/physiciansSlice';
import { getUsers } from '../../store/slices/users/userActions';

const ManagePhysicians = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectPhysicianSearch);
  const physicians = useAppSelector(selectPhysicians);
  const selectedID = useAppSelector(selectPhysicianId);
  const physician = PHYSICIAN;
  const occupationId = useAppSelector(selectOccupationId);

  const rowClick = (id: string) => {
    dispatch(setPhysicianID(id));
  };

  const onSearch = (
    search: string,
    userType: string,
    occupationId?: string | undefined,
  ): void => {
    dispatch(setPhysicianSearch(search));
    dispatch(clearPhysicians());
    dispatch(
      getUsers({
        search,
        userType,
        occupationId,
      }),
    );
  };

  const onOccupationChange = (occupationId: string) => {
    dispatch(clearPhysicians());
    dispatch(
      getUsers({
        search,
        userType: physician,
        occupationId,
      }),
    );
  };

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
          userType={physician}
          searchState={search}
          addButton
          onOccupationChange={onOccupationChange}
        />
        <UserTable
          userType={physician}
          users={physicians}
          search={search}
          onClick={rowClick}
          selectedID={selectedID}
          occupationId={occupationId}
          renderEditButtons
        />
      </Stack>
    </Box>
  );
};

export default ManagePhysicians;
