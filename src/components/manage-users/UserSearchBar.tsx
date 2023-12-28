import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  fetchOccupations,
  selectOccupations,
} from '../../store/slices/occupation/occupationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ADMIN, PATIENT, PHYSICIAN } from '../../utils/Users';
import { useDebounce } from '../../hooks/useDebounce';
import {
  selectOccupationId,
  setOccupationSearch,
} from '../../store/slices/users/physiciansSlice';
import AddUserButton from '../../pages/manage-users/AddUserButton';

interface SearchProps {
  onSearch: (search: string, userType: string, occupationId?: string) => void;
  userType: typeof PATIENT | typeof PHYSICIAN | typeof ADMIN;
  onOccupationChange?: (occupationId: string) => void;
  searchState?: string;
  addButton?: boolean;
}

const UserSearchBar = ({
  onSearch,
  userType,
  onOccupationChange,
  searchState = '',
  addButton = false,
}: SearchProps) => {
  const occupations = useAppSelector(selectOccupations);

  const dispatch = useAppDispatch();

  const [debouncedSearch, setDebounce] = useDebounce(1000);
  const occupationID = useAppSelector(selectOccupationId);
  const [searchValue, setSearchValue] = useState(searchState);

  useEffect(() => {
    console.log(`debounce change |${debouncedSearch}|`);
    if (debouncedSearch !== null) {
      onSearch(debouncedSearch, userType, occupationID);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (occupations.length === 0) {
      dispatch(fetchOccupations());
    }
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 150,
        width: 150,
        backgroundColor: '#ededed',
      },
    },
  };

  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{
        marginBottom: 1,
        // border: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        placeholder='Search'
        size='small'
        value={searchValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: '#ededed',
          minWidth: '45%',
        }}
        onChange={(event) => {
          setSearchValue(event.target.value);
          setDebounce(event.target.value);
        }}
      />
      {userType === PHYSICIAN && onOccupationChange && (
        <FormControl
          size='small'
          sx={{ backgroundColor: '#ededed', width: '45%' }}
        >
          <Select
            id='demo-simple-select'
            value={occupationID}
            onChange={(event) => {
              const id = event.target.value;
              dispatch(setOccupationSearch(id));
              onOccupationChange(id);
            }}
            displayEmpty
            MenuProps={MenuProps}
          >
            <MenuItem value=''>
              <em>Occupation</em>
            </MenuItem>
            {occupations.map((occupation) => (
              <MenuItem key={occupation.id} value={occupation.id}>
                {occupation.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {addButton && <AddUserButton userType={userType} />}
    </Stack>
  );
};

export default UserSearchBar;
