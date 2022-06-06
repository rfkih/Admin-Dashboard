import React from 'react'

import { Typography,Container, Grid, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link} from 'react-router-dom'

function Tablebody({products, columnsProducts}) {




    return (
        <TableBody>
        {products.map((item, index) => {
          return (
            <TableRow component={Link} to={`/transactiondetails/${item.id}`} hover role="checkbox" tabIndex={-1} key={index}>
              {columnsProducts.map((column) => {
                const value = item[column.id];
                if (column.id === "productIMG" ) {    
                  return (
                      <TableCell key={column.id} align={column.align}  style={{ maxWidth:  100}}>
                          <div className='flex items-center'>
                          <img
                            className=' rounded-md h-20 w-24 mr-2'
                            src={value}
                            alt="Product Image"
                            />
                          </div>              
                      </TableCell>     
                  )  
                  } else if(column.id === "isLiquid") {
                  return (    
                    <TableCell key={column.id} align={column.align}>
                      {value ? <p className="font-semibold">Liquid</p> :  <p className="font-semibold" >Non-Liquid</p>}
                    </TableCell>                                      
                  )
                    } else {
                        return(
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
    )
}

export default Tablebody