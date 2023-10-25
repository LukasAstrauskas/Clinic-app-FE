import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PhysicianSearchStyles, {
  SearchSelectItem,
} from '../styles/PhysicianSearchStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOccupations,
  selectOccupations,
} from '../../store/slices/occupation/occupationSlice';
import { useAppDispatch } from '../../store/hooks';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';

interface SearchProps {
  onSearch: (value: string, searchBy: string) => void;
}

const PhysicianSearchBar = ({ onSearch }: SearchProps) => {
  const occupations = useSelector(selectOccupations);
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

  return (
    <form>
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
        {/* TODO */}
        {/* Chanhe 'SearchSelectItem' to MUI component */}
        <TextField
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
        </TextField>
      </Box>
    </form>
  );
};

export default PhysicianSearchBar;
