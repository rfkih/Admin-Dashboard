import React,{useState} from 'react'

import { Typography,Container, Grid, TextField, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link} from 'react-router-dom'

function Tablebody({products, columnsProducts, editMode}) {
    const [isEdit, setIsEdit] = useState(false)

    const editFunction = () => (
        setIsEdit(!isEdit)
    )

console.log(editMode)


    return (
        <>
            {isEdit ? 
            <TableBody>
              {products.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                      } else if(column.id === "rownumber") {
                          return(
                              
                              <TableCell key={column.id} align={column.align}>
                                {value}  
                              </TableCell> 
                          )      
                      }  else {
                        return(
                              
                            <TableCell key={column.id} align={column.align}>
                              <TextField key={index}/>
                            </TableCell> 
                        )
                      }
                    })}
                  </TableRow>
                )
              })}
            </TableBody>  :
              <TableBody>
              {products.map((item, index) => {
                return (
                  <TableRow onClick={editMode && editFunction} hover role="checkbox" tabIndex={-1} key={index}>
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
        }
      </>
    )
}

export default Tablebody