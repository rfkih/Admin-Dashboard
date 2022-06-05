import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, Avatar, CardContent,InputBase, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import {Header } from '../components'
import axios from '../utils/axios'

function Customers() {
  const [ users, setUsers ] = useState([])
  const [ totalUsers, setTotalUsers] = useState(0)
  const [ userPerPage, setUserPerPage] = useState(10)
  const [page, setPage] = useState(0)

 console.log(page);


  const handleChangePageUser = (event, newPage) => {
    setPage(newPage)
}
const handleChangeUserPerPage = (event) => {
  setUserPerPage(+event.target.value);
  setPage(0)
}


  const columnsUser = [
    { id:'rownumber', label: 'No', align: 'center', minWidht: 10},
    { id:'username', label: 'Username', align: 'left', minWidth: 50},
    { id:'name', label: 'Name', align: 'center', minWidth: 100},
    { id:'email', label: 'E-Mail', align: 'center', minWidth: 70},
    { id:'id', label: 'Customer ID', align: 'center', minWidth: 70},
]


  const fetchUser = async () => {
    try {
        const res = await axios.get("/users/admin",  {params: { pages:(`limit ${userPerPage} offset ${(page) * userPerPage}`) }} );
        const {data} = res;
        

        setUsers(data.result)      
        setTotalUsers(data.userCount[0].user_count)
       
    } catch (error) {
        console.log(alert(error.message));
    }
};

useEffect(() => {
  fetchUser();
},[page, userPerPage])


  return (
    <div className='m-2 md:m-10 p-2 md:p-10'>
      <Header category="Page" title="Customers"/>
      <div className='w-full flex h-10 bg-slate-200'>
          <p>Test</p>
      </div>
      <TableContainer>
        <Table stickyHeader aria-label="styicky table" >
          <TableHead>
            <TableRow>
              {columnsUser.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{minWidth: column.minWidht}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
                {users.map((item, index) => {
                  return (
                    <TableRow  hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsUser.map((column, index) => {
                        const value = item[column.id];
                        const image = item.photo
                        if (column.id === "username") {
                          return (
                            <TableCell key={index} align={column.align}>
                              <div className='flex items-center'>
                              <img
                                className='rounded-full h-10 w-10 mr-2'
                                src={image}
                                alt="User Profile"
                                />
                                <p className='font-semibold'> {value} </p>
                              </div>    
                            </TableCell>
                          )                          
                        } else {
                          return (
                            <TableCell key={index} align={column.align}>
                              {value}
                            </TableCell>
                          )                      
                        }
                      })}

                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={totalUsers}
          rowsPerPage={userPerPage}
          page={page}
          onPageChange={handleChangePageUser}
          onRowsPerPageChange={handleChangeUserPerPage}
      />
    </div>
  )
}

export default Customers