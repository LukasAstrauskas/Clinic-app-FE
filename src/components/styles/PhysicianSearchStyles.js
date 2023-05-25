import { styled } from '@mui/material/styles';
import { MenuItem } from '@mui/material';

export const physicianSearchStyles = {
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 353,
    height: 30,
    marginTop: '1.1rem',
  },
  searchIcon: {
    fontSize: '30px',
    marginBottom: '1.5rem',
  },
  searchInput: {
    marginBottom: '1.7rem',
    marginLeft: '0.3rem',
    minWidth: '100px',
    backgroundColor: '#ededed',
    '& .MuiSelect-root': {
      height: '2.4rem',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'black',
      opacity: '0.8',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
  },
  searchSelect: {
    marginBottom: '1.7rem',
    marginLeft: '0.3rem',
    minWidth: '140px',
    backgroundColor: '#ededed',
    height: '2.4rem',
    '& .MuiInputBase-input': {
      opacity: '0.8',
      paddingTop: '0.5rem',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
    searchSelectItem: {
      height: '2rem',
    },
    '& .MuiInputLabel-root': {
      top: '-9px',
      color: 'black !important',
      opacity: '0.8',
    },
    '& .MuiInputLabel-shrink': {
      opacity: 0,
    },
  },
};

export const SearchSelectItem = styled(MenuItem)(() => ({
  ...physicianSearchStyles.searchSelect.searchSelectItem,
}));
export default physicianSearchStyles;
