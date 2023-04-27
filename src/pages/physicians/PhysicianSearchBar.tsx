import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PhysicianSearchStyles, {
  SearchSelectItem,
} from '../../components/styles/PhysicianSearchStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOccupations,
  selectOccupations,
} from '../../store/slices/occupation/occupationSlice';
import { AppDispatch } from '../../store/types';

interface SearchProps {
  onSearch: (value: string, searchBy: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const occupations = useSelector(selectOccupations);
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setOccupation] = useState('');
  const [searchBy, setSearchBy] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOccupation(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchBy(event.target.value as string);
  };

  useEffect(() => {
    dispatch(fetchOccupations());
  }, [dispatch]);

  useEffect(() => {
    onSearch(searchTerm, searchBy);
    console.log('search= ' + searchTerm);
    console.log('occupation= ' + searchBy);
  }, [searchBy, searchTerm]);

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

export default Search;
