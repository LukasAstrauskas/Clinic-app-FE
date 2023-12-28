import React from 'react';
import { Box, Stack } from '@mui/material';
import UserSearchBar from '../../components/manage-users/UserSearchBar';
import UserTable from '../../components/manage-users/UserTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setPatientSearch,
  clearPatients,
  selectPatientSearch,
  selectPatients,
  selectPatientId,
  setPatientId,
} from '../../store/slices/users/patientsSlice';
import { PATIENT } from '../../utils/Users';
import { getUsers } from '../../store/slices/users/userActions';

const ManagePatients = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectPatientSearch);

  const onSearch = (search: string, userType: string) => {
    dispatch(setPatientSearch(search));
    dispatch(clearPatients());
    dispatch(
      getUsers({
        search,
        userType,
      }),
    );
  };
  const patient = PATIENT;

  const patients = useAppSelector(selectPatients);

  function rowClick(id: string): void {
    dispatch(setPatientId(id));
  }

  const selectedID = useAppSelector(selectPatientId);

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
          userType={patient}
          searchState={search}
          addButton
        />
        <UserTable
          userType={patient}
          users={patients}
          search={search}
          onClick={rowClick}
          selectedID={selectedID}
          renderEditButtons
        />
      </Stack>
    </Box>
  );
};

export default ManagePatients;
