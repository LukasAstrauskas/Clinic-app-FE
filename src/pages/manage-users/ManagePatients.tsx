import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import UserSearchBar from '../book-appointment/UserSearchBar';
import UserTable from '../book-appointment/UserTable';
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
    console.log(id);
    dispatch(setPatientId(id));
  }

  const seletedID = useAppSelector(selectPatientId);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack>
        <Typography variant='caption'>{search}</Typography>
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
          selectedID={seletedID}
          renderEditButtons
        />
      </Stack>
    </Box>
  );
};

export default ManagePatients;
