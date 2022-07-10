import React,{useState, useRef, useEffect} from 'react'

import { Typography,Container, Grid, TextField, ListItem, List, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link, useParams} from 'react-router-dom'
import axios from '../utils/axios';
import { Category } from '@mui/icons-material';
import { setTime } from '@syncfusion/ej2-react-schedule';

function StocksBody({columnsStocks, item,}) {
  const [ totalStocks, setTotalStocks] = useState(0)
  const [ availableStocks, setAvailableStocks] = useState(0)
  console.log(item)


  const totalStocksFunction = () => {
    if (item.isLiquid === 1){
      setTotalStocks((item.qtyBoxTotal*10)+item.qtyBottleTotal)
    }else{
      setTotalStocks((item.qtyBoxTotal*10)+item.qtyStripsTotal)
    }
  }


  const availableStocksFunction = () => {
    if (item.isLiquid === 1){
      setAvailableStocks((item.qtyBoxAvailable*10)+item.qtyBottleAvailable)
    }else{
      setAvailableStocks((item.qtyBoxAvailable*10)+item.qtyStripsavailable)
    }
  }

  useEffect(() => {
    totalStocksFunction()
    availableStocksFunction()
  },[])


  return (
    <>
        <TableRow>
          {columnsStocks.map((column) => {
            const value = item[column.id];
            if (column.id === "productIMG") {
              return (
                <TableCell key={column.id} align={column.align}>
                  <div className='flex items-center'>
                    <img
                      className='rounded-md h-20 w-24 mr-2'
                      src={value}
                      alt="Product Image"
                    />
                  </div>
                </TableCell>
              )
            } else if (column.id === "totalStocks") {
             
              return(
                <TableCell key={column.id} align={column.align} >
                  {totalStocks}
                </TableCell>
              )
            } else if (column.id === "availableStocks") {
              return (
                <TableCell key={column.id} align={column.align} >
                  {availableStocks}
                </TableCell>
              )
              
            } else if (column.id === "action") {
              return(
                <TableCell key={column.id} align={column.align} >
                  <button type='button' className='rounded-md w-content h-content bg-slate-200 hover:bg-slate-300 py-1 px-2 items-center'>
                   <p className='text-black font-semibold'>Edit</p>
                  </button>
                </TableCell>
              )
            } else {
              return (
                <TableCell key={column.id} align={column.align} >
                  {value}
                </TableCell>
              )
            } 
          })}
        </TableRow>
    </>
  )
}

export default StocksBody