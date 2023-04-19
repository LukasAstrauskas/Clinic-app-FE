import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { TableContainer, Table, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import PhysicianModalContent from '../../components/modals/AddPhysicianModal';
import Styles from '../../components/styles/UserManagmentStyles';
import TableHeadComponent from '../../components/tableComponents/HeadComponent';
import TableBodyComponent from '../../components/tableComponents/BodyComponent';

export const Physicians = () => {
  const [open, setOpen] = useState(false);
  const [checkedPhysician, setCheckedPhysician] = useState<string[]>([]);
  const [physicians, setPhysicians] = useState<PhysicianType[]>([]);
  const getRequestUrl = 'http://localhost:8080/physicianInfo';
  const [refresh, setRefresh] = useState<boolean>(false);

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
        setPhysicians(res.data);
      });
  }

  useEffect(() => {
    getData();
  }, [open]);
  type PhysicianType = {
    id: string;
    name: string;
    email: string;
    occupation: {
      id: string;
      name: string;
    };
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    checkedPhysician.forEach((physician) => {
      const deleteURL = `http://localhost:8080/physician/${physician}`;
      axios.delete(deleteURL);
    });
    setCheckedPhysician([]);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectePhysician = e.target;
    if (selectePhysician.checked) {
      setCheckedPhysician([...checkedPhysician, selectePhysician.id]);
    } else {
      setCheckedPhysician(
        checkedPhysician.filter(
          (physician) => physician !== selectePhysician.id,
        ),
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
        .get(`http://localhost:8080/user/physicianSearch/${search}`, {
          headers: getRequestHeaders,
        })
        .then((res) => {
          setPhysicians(res.data);
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
        Physicians
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
      <PhysicianModalContent setOpen={setOpen} open={open} />
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
              collumName='occupation'
            />
          </Table>

          <TableBodyComponent
            sizeEndpoint='user/physicianSize'
            endpoint='physcians/limit/'
            collumValue='physician'
            setRefresh={setRefresh}
            refresh={refresh}
            setUser={setPhysicians}
            user={physicians}
            handleChecked={handleChecked}
          />
        </TableContainer>
      </Box>
    </>
  );
};
