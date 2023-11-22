import React, { useEffect, useState } from 'react';
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
import useDebouncedSearch from '../../hooks/useDebouncedSearch';
import { PHYSICIAN } from '../../utils/Users';
import useDebounce from '../../hooks/useDebounce';

interface SearchProps {
  onSearch: (search: string | null, occupationId?: string) => void;
  type: 'patient' | 'physician';
}

const UserSearchBar = ({ onSearch, type }: SearchProps) => {
  const occupations = useAppSelector(selectOccupations);

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300);

  const [text, setText] = useState<string>('');
  const [debouncedValue, setDebounce] = useDebounce(1000);
  const [occupID, setOccupID] = useState('');

  useEffect(() => {
    if (debouncedValue !== null || occupID !== '') {
      const val = debouncedValue !== '' ? debouncedValue : 'Empty str';
      // console.log('myhook:' + val);
      // console.log('ID:' + occupID);
      onSearch(debouncedValue, occupID);
    }
  }, [debouncedValue, occupID]);

  useEffect(() => {
    if (occupations.length === 0) {
      dispatch(fetchOccupations());
    }
  }, []);

  // useEffect(() => {
  //   console.log('Raw: ' + debouncedSearchTerm);
  //   onSearch && onSearch(debouncedSearchTerm, searchBy);
  // }, [debouncedSearchTerm, searchBy]);

  const handleOccupChange = (text: string) => {
    console.log('Occup change');
    setOccupID(text);
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
      <Chip label={debouncedValue} />
      {type === PHYSICIAN && (
        <FormControl
          size='small'
          sx={{ backgroundColor: '#ededed', width: '45%' }}
        >
          <Select
            id='demo-simple-select'
            value={occupID}
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
