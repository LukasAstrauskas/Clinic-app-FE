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

interface SearchProps {
  onSearch: (value: string, searchBy: string) => void;
}

const PhysicianSearchBar = ({ onSearch }: SearchProps) => {
  const occupations = useAppSelector(selectOccupations);

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300);

  const [text, setText] = useState('');
  const delayedText = useDebouncedSearch(text, 500);

  const textChange = (text: string) => {
    console.log('text change');
    setText(text);
  };

  useEffect(() => {
    if (occupations.length === 0) {
      dispatch(fetchOccupations());
    }
  }, []);

  useEffect(() => {
    onSearch(debouncedSearchTerm, searchBy);
  }, [debouncedSearchTerm, searchBy]);

  const [occupID, setOccupID] = useState('');

  const handleOccupChange = (text: string) => {
    console.log('Occup change');
    setOccupID(text);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 150,
        width: 150,
      },
    },
  };

  return (
    <Stack direction='row' spacing={1} sx={{ marginBottom: 1 }}>
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
          width: '50%',
        }}
        onChange={(event) => textChange(event.target.value)}
      />
      <FormControl size='small' sx={{ width: '50%' }}>
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
    </Stack>
  );
};

export default PhysicianSearchBar;
