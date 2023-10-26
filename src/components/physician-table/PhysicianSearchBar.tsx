import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  fetchOccupations,
  selectOccupations,
} from '../../store/slices/occupation/occupationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';
import { Occupation } from '../../model/Model';

interface SearchProps {
  onSearch: (value: string, searchBy: string) => void;
}

const PhysicianSearchBar = ({ onSearch }: SearchProps) => {
  // const occupations = useAppSelector(selectOccupations);
  const occupations: Occupation[] = [
    { id: '1', name: 'Mentalist' },
    { id: '2', name: 'Herbalist' },
    { id: '3', name: 'Chiropractor' },
    { id: '4', name: 'Clairvoyant' },
  ];

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [text, setText] = useState('');
  const delayedText = useDebouncedSearch(text, 500);

  const textChange = (text: string) => {
    setText(text);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchBy(event.target.value as string);
  };

  useEffect(() => {
    dispatch(fetchOccupations());
  }, [dispatch]);

  useEffect(() => {
    onSearch(debouncedSearchTerm, searchBy);
  }, [debouncedSearchTerm, searchBy]);

  const [occupID, setOccupID] = useState('');

  const handleOccupChange = (event: SelectChangeEvent) => {
    setOccupID(event.target.value);
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
    <>
      {/* <Chip label={delayedText}></Chip>
      <Chip label={`ID: ${occupID}`}></Chip> */}
      <Stack direction='row' spacing={1} sx={{ marginBottom: 1 }}>
        {/* <Box
          sx={{
            width: '50%',
            backgroundColor: '#ededed',
            borderRadius: 2,
          }}
        > */}
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
        {/* </Box> */}
        <FormControl size='small' sx={{ width: '50%' }}>
          <Select
            id='demo-simple-select'
            value={occupID}
            onChange={handleOccupChange}
            displayEmpty
            // sx={{ backgroundColor: '#ededed' }}
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
      {/* </Box> */}
    </>
  );
};

export default PhysicianSearchBar;
