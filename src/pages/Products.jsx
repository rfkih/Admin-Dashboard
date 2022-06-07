import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from '../utils/axios'
import moment from 'moment'
import {Link} from 'react-router-dom'

import {Header} from '../components'
import {Tablebody} from './'

function Products() {
    const [ sort, setSort] = useState('')
    const [ page, setPage] = useState(0)
    const [ keyword, setKeyword] = useState('')
    const [ countProduct, setCountProduct] = useState(0)
    const [ products, setProducts ] = useState([])
    const [ productsPerPage, setProductsPerPage] = useState(10)
    const [ editMode, setEditMode] = useState(false)



    const columnsProducts = [
        { id:'rownumber', label: 'No', align: 'center', minWidht: 40},
        { id:'productIMG', label: 'Image', align: 'center', minWidth: 100},
        { id:'productName', label: 'Name', align: 'center', minWidth: 60},  
        { id:'categoryName', label: 'Category', align: 'center', minWidth: 60},   
        { id:'productDetails', label: 'Details', align: 'center', minWidth: 30},
        { id:'price', label: 'price', align: 'center', minWidth: 60},
        { id:'isLiquid', label: 'Liquid' ,align: 'center', minWidth: 60},
    ]


    const handleChange = (e) => {
        setKeyword( [e.target.name] = e.target.value ) 
        setPage(0)
      }


      const handleChangePageProducts = (event, newPage) => {
        setPage(newPage)
      }
      const handleChangeProductsPerPage = (event) => {
        setProductsPerPage(+event.target.value);
        setPage(0)
      }


    const fetchProducts = async () => {
        try {
            const res = await axios.get("/products", {params: { pages:(`limit ${productsPerPage} offset ${(page) * productsPerPage}`), keyword , sort}} )
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
      },[page, productsPerPage, keyword])

  



  return (
    <div className='m-2 md:m-10 p-2 md:p-10'>
        <Header category="Pages" title="Products"/>
        <div className='w-full flex items-center flex-wrap justify-end h-content rounded-t-lg bg-slate-200'>
            <div className='mx-2 w-5 h-content'>
                <button
                    type="button"
                    className='rounded-sm hover:bg-slate-300 p-1 '
                    onClick={() => setEditMode(!editMode)}
                >
                    {editMode ? <p>Save</p> : <p>Edit</p>}
                </button>

            </div>
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
                  value={keyword}
                  onChange={handleChange}
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
                <TableBody>
                    {products.map((item, index) => (
                        <Tablebody key={index} page={page} productsPerPage={productsPerPage} keyword={keyword} item={item} fetchProducts={fetchProducts} editMode={editMode} columnsProducts={columnsProducts}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={countProduct}
          rowsPerPage={productsPerPage}
          page={page}
          onPageChange={handleChangePageProducts}
          onRowsPerPageChange={handleChangeProductsPerPage}
      />
    </div>
  )
}

export default Products