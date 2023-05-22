const Styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'white',
    border: '2px solid #D3D3D3',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  },
  textField: {
    width: '47%',
    '& .MuiInputBase-root': {
      background: '#ededed',
    },
    '& .MuiFormHelperText-root': {
      minHeight: '40px',
    },
    '& .MuiInputLabel-root': {
      color: '#28cdcb',
      marginTop: '0.8rem',
    },
  },
  typography: {
    fontWeight: '700',
  },
  box: {
    width: '470px',
    m: 'auto',
    mt: '30px',
    scale: '90%',
  },
  cancelButton: {
    border: '1px solid orange',
    color: 'orange',
    '&:hover': {
      color: 'orange',
    },
  },
  createButton: {
    marginLeft: 3,
    bgcolor: '#25ced1',
    '&:hover': {
      bgcolor: '#25ced1',
    },
  },
  loginButton: {
    bgcolor: '#25ced1',
    '&:hover': {
      bgcolor: '#25ced1',
    },
  },
  searchField: {
    width: '340px',
    marginLeft: 3,
    marginTop: '40px',
    '& .MuiInputBase-root': {
      background: '#ededed',
    },
  },
  createNewUserBtn: {
    p: 1,
    ml: 4.2,
    mt: 0.3,
    scale: '110%',
    bgcolor: '#25ced1',
    '&:hover': {
      bgcolor: '#25ced1',
    },
  },
  searchIcon: {
    ml: 2,
    mb: 1,
    scale: '170%',
  },
};

export default Styles;
