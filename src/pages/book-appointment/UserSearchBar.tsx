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

interface SearchProps {
  onSearch?: (value: string, searchBy: string) => void;
  type: 'patient' | 'physician';
}

const PhysicianSearchBar = ({ onSearch, type }: SearchProps) => {
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
    onSearch && onSearch(debouncedSearchTerm, searchBy);
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
        border: 1,
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
        onChange={(event) => textChange(event.target.value)}
      />
      {/* <TextField /> */}
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

export default PhysicianSearchBar;
