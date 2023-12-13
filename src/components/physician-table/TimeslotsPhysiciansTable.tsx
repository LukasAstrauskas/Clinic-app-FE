import React from 'react';
import UserSearchBar from '../../pages/book-appointment/UserSearchBar';
import UserTable from '../../pages/book-appointment/UserTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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
import { PHYSICIAN } from '../../utils/Users';
import { User } from '../../model/Model';

const TimeslotsPhysiciansTable = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectPhysicianSearch);
  const physicians = useAppSelector(selectPhysicians);
  const userType = PHYSICIAN;
  const physicianId = useAppSelector(selectPhysicianId);
  const occupationId = useAppSelector(selectOccupationId);

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
        userType,
        occupationId,
      }),
    );
  };

  const rowClick = (id: string) => {
    dispatch(setPhysicianID(id));
  };

  return (
    <div>
      <UserSearchBar
        onSearch={onSearch}
        userType={userType}
        onOccupationChange={onOccupationChange}
        searchState={search}
      />
      <UserTable
        users={physicians}
        search={search}
        userType={userType}
        onClick={rowClick}
        selectedID={physicianId}
        occupationId={occupationId}
        renderEmail={false}
      />
    </div>
  );
};

export default TimeslotsPhysiciansTable;
