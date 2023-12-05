import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { tableRowSX } from '../../components/physician-table/PhysicianTable';
import { User } from '../../model/Model';
import { useAppDispatch } from '../../store/hooks';
import { ADMIN, PATIENT, PHYSICIAN } from '../../utils/Users';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUsers } from '../../store/slices/users/userActions';
import EditBodyCell from '../../components/manage-users/EditBodyCell';

type props = {
  users: User[];
  search: string;
  userType: typeof PATIENT | typeof PHYSICIAN | typeof ADMIN;
  onClick: (id: string) => void;
  selectedID: string;
  occupationId?: string;
  renderEmail?: boolean;
  renderEditButtons?: boolean;
};

const UserTable = ({
  users,
  search,
  userType,
  onClick,
  selectedID,
  occupationId = '',
  renderEmail = true,
  renderEditButtons = false,
}: props) => {
  const dispach = useAppDispatch();
  const offset = users.length;

  useEffect(() => {
    if (users.length === 0) {
      console.log(`length 0, fetching data`);
      dispach(getUsers({ offset, userType }));
    }
  }, []);

  useEffect(() => {
    console.log(users);
  }, []);

  const occupHeadCell = (
    <TableCell align='right' sx={{ fontWeight: 'bold' }}>
      Occupation
    </TableCell>
  );

  const occupBodyCell = (user: User) => (
    <TableCell align='right'>{user.occupation?.name}</TableCell>
  );

  const emailHeadCell = () => (
    <TableCell align='right' sx={{ fontWeight: 'bold' }}>
      EMAIL {users.length}
    </TableCell>
  );

  const emailBodyCell = (user: User) => (
    <TableCell align='right'>{user.email}</TableCell>
  );

  const editHeadCell = (userType: string) => {
    return (
      <TableCell align='right' sx={{ fontWeight: 'bold' }}>
        EDIT {userType.toUpperCase()}
      </TableCell>
    );
  };

  // const editBodyCell = (user: User) => {
  //   const { name, surname } = user;
  //   return (
  //     <TableCell>
  //       <IconButton
  //         color='success'
  //         onClick={() => {
  //           console.log(`edit user ${name} ${surname}`);
  //         }}
  //       >
  //         <EditIcon />
  //       </IconButton>
  //       <IconButton
  //         color='success'
  //         onClick={() => {
  //           console.log('del user');
  //         }}
  //       >
  //         <DeleteIcon />
  //       </IconButton>
  //     </TableCell>
  //   );
  // };

  return (
    <TableContainer
      component={Paper}
      id='scrollBox'
      sx={{
        backgroundColor: grey[200],
        marginTop: 2,
        // border: 2,
        height: 320,
        overflow: 'scroll',
      }}
    >
      <InfiniteScroll
        scrollableTarget='scrollBox'
        next={() => {
          console.log('fetch data');
          dispach(getUsers({ offset, search, userType, occupationId }));
        }}
        hasMore={offset > 4}
        loader={<></>}
        dataLength={offset}
      >
        <Table size='medium' aria-label='a dense table' sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>NAME</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                SURNAME
              </TableCell>
              {renderEmail && emailHeadCell()}
              {userType === PHYSICIAN && occupHeadCell}
              {renderEditButtons && editHeadCell(userType)}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={tableRowSX(user.id === selectedID)}
                hover
                onClick={() => onClick(user.id)}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell align='right'>{user.surname}</TableCell>
                {renderEmail && emailBodyCell(user)}
                {userType === PHYSICIAN && occupBodyCell(user)}
                {renderEditButtons && <EditBodyCell user={user} />}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default UserTable;
