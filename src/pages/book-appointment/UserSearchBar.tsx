import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Chip,
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
import useDebounce from '../../hooks/useDebounce';

interface SearchProps {
  onSearch: (search: string, userType: string, occupationId?: string) => void;
  userType: typeof PATIENT | typeof PHYSICIAN | typeof ADMIN;
}

const UserSearchBar = ({ onSearch, userType }: SearchProps) => {
  const occupations = useAppSelector(selectOccupations);

  const dispatch = useAppDispatch();

  const [debouncedSearch, setDebounce] = useDebounce(1000);
  const [occupationID, setOccupationID] = useState('');

  useEffect(() => {
    console.log(`debounce change |${debouncedSearch}|`);
    if (debouncedSearch !== null) {
      onSearch(debouncedSearch, userType);
    }
  }, [debouncedSearch]);

  // useEffect(() => {
  //   onSearch(debouncedSearch, userType, occupationID);
  // }, [debouncedSearch, occupationID]);

  useEffect(() => {
    if (occupations.length === 0) {
      dispatch(fetchOccupations());
    }
  }, []);

  const handleOccupChange = (occupationID: string) => {
    setOccupationID(occupationID);
  };

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
        // value={value.current}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: '#ededed',
          width: '45%',
        }}
        onChange={(event) => {
          setDebounce(event.target.value);
        }}
      />
      {/* <Chip label={localStorage.getItem('patientSearch') || ''} /> */}
      {userType === PHYSICIAN && (
        <FormControl
          size='small'
          sx={{ backgroundColor: '#ededed', width: '45%' }}
        >
          <Select
            id='demo-simple-select'
            value={occupationID}
            onChange={(event) => handleOccupChange(event.target.value)}
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
    </Stack>
  );
};

export default UserSearchBar;
