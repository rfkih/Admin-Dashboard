import React, {useState, useEffect} from 'react'
import axios from '../utils/axios'
import { Typography,Container, Grid, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import {Header} from '../components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import moment from 'moment'
import {Link} from 'react-router-dom'

function Transaction() {
  const [ transactions, setTransactions ] = useState([])
  const [ totalTransactions, setTotalTransactions] = useState(0)
  const [ transactionsPerPage, setTransactionsPerPage] = useState(10)
  const [ sort, setSort] = useState('order by created_at desc')
  const [ page, setPage] = useState(0)
  const [ keyword, setKeyword] = useState('')
  const [ status, setStatus] = useState('')
 

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  };


  const handleChange = (e) => {
    setKeyword( [e.target.name] = e.target.value ) 
  }


  const columnsTransaction = [
    { id:'rownumber', label: 'No', align: 'center', minWidht: 10},
    { id:'invoice', label: 'Invoice', align: 'center', minWidth: 60},
    { id:'transactionStatus', label: 'Status', align: 'center', minWidth: 60},
    { id:'totalPrice', label: 'Amount', align: 'center', minWidth: 60},
    { id:'user_id', label: 'Customer ID', align: 'center', minWidth: 60},
    { id:'created_at', label: 'Date' ,align: 'center', minWidth: 60},
]

  const fetchTransaction = async () => {
    try {
        const res = await axios.get("/transaction",  {params: { pages:(`limit ${transactionsPerPage} offset ${(page) * transactionsPerPage}`), keyword , sort, status}} );
        const {data} = res;
  
        setTransactions(data.result)      
        setTotalTransactions(data.count[0].count)
       
    } catch (error) {
        console.log(alert(error.message));
    }
};

const handleChangePageTransactions = (event, newPage) => {
  setPage(newPage)
}
const handleChangeTransactionsPerPage = (event) => {
  setTransactionsPerPage(+event.target.value);
  setPage(0)
}

useEffect(() => {
  fetchTransaction()
},[keyword, transactionsPerPage, page, status])


  return (
    <div className='m-2 md:m-10 p-2 md:p-10'>
      <Header category="Page" title="Transaction"/>
      <div className='w-full flex flex-wrap justify-end h-content rounded-t-lg bg-slate-200'>
        <div className='mx-2'>     
          <FormControl >
            <InputLabel id="range-select-label">Status</InputLabel>
                <Select
                    displayEmpty
                    labelId="range-select-label"
                    id="range-select"
                    label="Status"
                    name="status"
                    defaultValue=""
                    onChange={handleChangeStatus}
                >
                    <MenuItem key={1} value={""} >Status</MenuItem>
                    <MenuItem key={2} value={"and transactionStatus = 'paid'"} >Paid</MenuItem>
                    <MenuItem key={3} value={"and transactionStatus = 'failed'"} >Failed</MenuItem>
                    <MenuItem key={4} value={"and transactionStatus = 'sent'"} >Sent</MenuItem>
                    <MenuItem key={5} value={"and transactionStatus = 'complete'"}>Complete</MenuItem>
                    </Select>
          </FormControl>
        </div>
        <div className='mx-2'>
          <FormControl size="small"  style={{margin : '0.5em', backgroundColor : 'white' , borderRadius: '5px' }} variant='outlined'>
            <InputLabel htmlFor="outlined-search">Search Invoice</InputLabel>
            <OutlinedInput
              id="outlined-search"
              label="Search Invoice" 
              name="keyword"
              size="small" 
              fullWidth
              type={'text'}
              value={keyword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle Search"
                    // onClick={onSearchClick}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <SearchOutlinedIcon/>
                  </IconButton>
                </InputAdornment>
              }
            >
            </OutlinedInput>
          </FormControl>
        </div>
      </div>
      <TableContainer style={{ backgroundColor: "#F1F5F9"}}>
        <Table stickyHeader area-label="sticky table">
          <TableHead>
            <TableRow  >
              {columnsTransaction.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidht}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((item, index) => {
              return (
                <TableRow component={Link} to={`/transactiondetails/${item.id}`} hover role="checkbox" tabIndex={-1} key={index}>
                  {columnsTransaction.map((column) => {
                    const value = item[column.id];
                    if (column.id === "created_at" ) {
                      const date =  moment(value).utc().format('DD/MM/YYYY')
                      return (
                          <TableCell key={column.id} align={column.align}>
                              {date}
                          </TableCell>     
                      )  
                      } else {
                      return (
                          <TableCell key={column.id} align={column.align}>
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
          count={totalTransactions}
          rowsPerPage={transactionsPerPage}
          page={page}
          onPageChange={handleChangePageTransactions}
          onRowsPerPageChange={handleChangeTransactionsPerPage}
      />
    </div>
  )
}

export default Transaction