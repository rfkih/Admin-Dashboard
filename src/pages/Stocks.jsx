import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from '../utils/axios'
import {Header} from '../components'

function Stocks() {




    const columnsStocks = [
        { id:'rownumber', label: 'No', align: 'center', minWidht: 40},
        { id:'productIMG', label: 'Image', align: 'center', minWidth: 100},
        { id:'productName', label: 'Name', align: 'center', minWidth: 60},  
        { id:'totalStocks', label: 'Stocks', align: 'center', minWidth: 60},   
        { id:'add', label: 'Add', align: 'center', minWidth: 30},
        { id:'edit', label: 'edit', align: 'center', minWidth: 60},
    ]
  return (
    <div className='m-2 p-2 md:m-10 md:p-10'>
        <Header category="Page" title="Stocks"/>
        <div className='w-full flex items-center flex-wrap justify-end h-content rounded-t-lg bg-slate-200' >
            <div className='mx-2'>
              <FormControl size="small"  style={{margin : '0.5em', backgroundColor : 'white' , borderRadius: '5px' }} variant='outlined'>
                <InputLabel htmlFor="outlined-search">Search Products</InputLabel>
                <OutlinedInput
                  id="outlined-search"
                  label="Search Invoice" 
                  name="keyword"
                  size="small" 
                  fullWidth
                  type={'text'}
                //   value={keyword}
                //   onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle Search"
                        // onClick={onSearchClick}
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
            <Table>
                <TableHead>
                    {columnsStocks.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidht , maxWidth:  100}}
                      >
                        {column.label}
                      </TableCell>
                    ))}

                </TableHead>
            </Table>

        </TableContainer>
    </div>
  )
}

export default Stocks