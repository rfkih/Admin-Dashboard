import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from '../utils/axios'
import moment from 'moment'
import {Link} from 'react-router-dom'

import {Header} from '../components'

function Products() {
    const [ sort, setSort] = useState('order by created_at desc')
    const [ page, setPage] = useState(0)
    const [ keyword, setKeyword] = useState('')
    const [ countProduct, setCountProduct] = useState(0)
    const [ products, setProducts ] = useState([])

    console.log(products)


    const columnsProducts = [
        { id:'rownumber', label: 'No', align: 'center', minWidht: 10},
        { id:'productIMG', label: 'Image', align: 'center', minWidth: 60},
        { id:'productName', label: 'Name', align: 'center', minWidth: 60},    
        { id:'productDetails', label: 'Details', align: 'center', minWidth: 60},
        { id:'price', label: 'price', align: 'center', minWidth: 60},
        { id:'isLiquid', label: 'Liquid' ,align: 'center', minWidth: 60},
    ]


    const fetchProducts = async () => {
        try {
            const res = await axios.get("/products", )
            .then((res=>{
              const { data } = res;
              setProducts(data.result)
              setCountProduct(data.count[0].count);
            }));
        } catch (error) {
            console.log(alert(error.message));
        }
      };

      useEffect(() => {
          fetchProducts()
      },[])

    const Tablehost = ({products, columnsProducts}) => {

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
                                className=' rounded-md h-20 w-20 mr-2'
                                src={value}
                                alt="Product Image"
                                />
                              </div>    
                              
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
        )
    }



  return (
    <div className='m-2 md:m-10 p-2 md:p-10'>
        <Header category="Pages" title="Products"/>
        <div className='w-full flex flex-wrap justify-end h-content rounded-t-lg bg-slate-200'>
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
                //   onChange={handleChange}
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
            <Table>
                <TableHead>
                  <TableRow  >
                    {columnsProducts.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidht , maxWidth:  100}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <Tablehost products={products} columnsProducts={columnsProducts}/>
            </Table>

        </TableContainer>
    </div>
  )
}

export default Products