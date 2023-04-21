import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import AddAdminModal from '../../components/modals/AddAdminModal';
import Styles from '../../components/styles/UserManagmentStyles';
import TableHeadComponent from '../../components/tableComponents/HeadComponent';
import TableBodyComponent from '../../components/tableComponents/BodyComponent';

export const Admins = () => {
  const [open, setOpen] = useState(false);
  const [checkedAdmins, setCheckedAdmins] = useState<string[]>([]);
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const getRequestUrl = 'http://localhost:8080/user/admins';
  const getRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  async function getData() {
    await axios
      .get(getRequestUrl, {
        headers: getRequestHeaders,
      })
      .then((res) => {
        setAdmins(res.data);
      });
  }

  useEffect(() => {
    getData();
  }, [open, checkedAdmins]);

  type AdminType = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    checkedAdmins.forEach((admin) => {
      const deleteURL = `http://localhost:8080/user/admins/${admin}`;
      axios.delete(deleteURL);
    });
    setCheckedAdmins([]);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAdmin = e.target;
    if (selectedAdmin.checked) {
      setCheckedAdmins([...checkedAdmins, selectedAdmin.id]);
    } else {
      setCheckedAdmins(
        checkedAdmins.filter((patient) => patient !== selectedAdmin.id),
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    if (search.length != 0) {
      const getRequestHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      axios
        .get(`http://localhost:8080/user/adminSearch/${search}`, {
          headers: getRequestHeaders,
        })
        .then((res) => {
          setAdmins(res.data);
        });
    } else {
      setRefresh(true);
      getData();
    }
  };

  return (
    <>
      <Typography
        variant='h3'
        sx={{
          textAlign: 'center',
          marginTop: 5,
          marginBottom: -5,
          fontWeight: 'bold',
          color: '#28cdcb',
        }}
      >
        Admins
      </Typography>

      <Box
        sx={{
          width: 600,
          m: 'auto',
          mt: 10,
        }}
      >
        <SearchIcon sx={Styles.searchIcon} />
        <TextField
          onChange={handleSearch}
          sx={Styles.searchField}
          className='search'
          id='search'
          variant='outlined'
          placeholder='Search'
        />

        <Button
          onClick={handleOpen}
          sx={Styles.createNewUserBtn}
          variant='contained'
        >
          Create new
          <AddIcon />
        </Button>
      </Box>
      <AddAdminModal setOpen={setOpen} open={open} />

      <Box
        sx={{
          m: 'auto',
          width: 600,
        }}
      >
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHeadComponent
              handleDelete={handleDelete}
              collumName='email'
            />
          </Table>
          <TableBodyComponent
            sizeEndpoint='user/adminSize'
            endpoint='user/admins/limit/'
            setRefresh={setRefresh}
            refresh={refresh}
            setUser={setAdmins}
            collumValue='admins'
            user={admins}
            handleChecked={handleChecked}
          />
        </TableContainer>
      </Box>
    </>
  );
};
