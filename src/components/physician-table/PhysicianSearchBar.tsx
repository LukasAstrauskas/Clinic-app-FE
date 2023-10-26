import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PhysicianSearchStyles, {
  SearchSelectItem,
} from '../styles/PhysicianSearchStyles';
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
    setOccupID(event.target.value as string);
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
      <Paper>ID:{occupID}</Paper>
      <Box sx={PhysicianSearchStyles.searchWrapper}>
        <SearchIcon sx={PhysicianSearchStyles.searchIcon} />
        <TextField
          id='searchInput'
          sx={PhysicianSearchStyles.searchInput}
          variant='outlined'
          value={searchTerm}
          onChange={handleChange}
          placeholder='Search'
          inputProps={{
            style: {
              height: '0.3rem',
            },
          }}
        />

        {/* <TextField
          id='searchBy'
          select
          label='Occupation'
          variant='outlined'
          value={searchBy}
          onChange={handleSelectChange}
          InputLabelProps={{
            shrink: searchBy !== '',
          }}
          sx={PhysicianSearchStyles.searchSelect}
        >
          <SearchSelectItem value=''>Occupation</SearchSelectItem>
          {occupations.map((occupation) => (
            <SearchSelectItem key={occupation.id} value={occupation.name}>
              {occupation.name}
            </SearchSelectItem>
          ))}
        </TextField> */}

        <FormControl fullWidth size='small' sx={{ minWidth: 150 }}>
          <Select
            id='demo-simple-select'
            value={occupID}
            onChange={handleOccupChange}
            displayEmpty
            sx={{
              backgroundColor: '#ededed',
              // , height: 38
            }}
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
      </Box>
    </>
  );
};

export default PhysicianSearchBar;
