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

  useEffect(() => {
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
    getData();
  }, [open, checkedPhysician]);

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
    const allTableRows = document.querySelectorAll('tr');
    const search = e.target.value.toLowerCase();
    if (search.length === 0) {
      allTableRows.forEach((row) => {
        row.classList.remove('hidden');
      });
    } else {
      allTableRows.forEach((row) => {
        const rowText = row.textContent?.toLocaleLowerCase();
        row.classList.add('hidden');
        if (rowText?.includes(search) || rowText?.includes('name')) {
          row.classList.remove('hidden');
        }
      });
    }
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: 5,
          marginBottom: -5,
          fontWeight: 'bold',
          color: '#28cdcb',
          fontSize: 36,
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
        <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
          <Table stickyHeader>
            <TableHeadComponent
              handleDelete={handleDelete}
              collumName='occupation'
            />

            <TableBodyComponent
              collumValue='physician'
              user={physicians}
              handleChecked={handleChecked}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
