import React,{useState, useRef, useEffect} from 'react'

import { Typography,Container, Grid, TextField, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Link, useParams} from 'react-router-dom'
import axios from '../utils/axios';

const Tablebody = ({item, columnsProducts, editMode, fetchProducts, page, keyword, productsPerPage}) => {
    const params = useParams();
    const [ product, setProduct] = useState([])
    const [ isEdit, setIsEdit] = useState(false)
    const [ category, setCategory] = useState([])
    const { id, category_id, productName, productDetails, productIMG, isLiquid, price } = product
    const btnRef = useRef()
 



    category.map((name)=>{
        if (item.category_id == name.id) {  
            item.categoryName = name.categoryName
        }
    })

    category.map((name)=>{
      if (product.category_id == name.id) {  
          product.categoryName = name.categoryName
      }
  })

    const handleChange = (e) => {
      setProduct({ ...product, [e.target.name]: e.target.value });
  };
    
 useEffect(() => {
    
    const closeEdit = (e) => {   
   
        if (!btnRef.current?.contains(e.target)) {       
          setIsEdit(false)
         
      }          
    }
   document.body.addEventListener('click', closeEdit)
   return () => document.body.removeEventListener('click', closeEdit)
 }, [])
 

 const onInputPress = (e) => {
  
  if (e.code === "Enter") {
    updateProduct();
    setIsEdit(false)
  };
};
   

    const editFunction = () => (
      fetchProductById(),
        setIsEdit(!isEdit)
        
    )

 
    const fetchProductById = async () => {

      try {
        console.log(item.id)
          const res = await axios.get(`/products/${item.id}`,{ params: { id: item.id } } )
          const {data} = res
          setCategory(data.category)
          setProduct(data.result[0]);
          // setOnCancelData(data.result[0])
          
      } catch (err) {
      console.log({ err });
          
      }
  }

    useEffect(() => {
      
      
      fetchCategories()
      
    },[])

    useEffect(() => {
      if (isEdit) {
        fetchProductById()
      }
    },[isEdit])



    const fetchCategories = async () => {
      try {
          const res = await axios.get("/categories");
          const  categories = res
          const category = categories.data
          setCategory(category)
      } catch (error) {
          console.log(alert(error.message));
      }
  };

  const updateProduct = async () => {
        
    const updatedProduct = {
      id,
      category_id,
      productName,
      productDetails,
      productIMG,
      isLiquid,
      price,
    };

    console.log(updatedProduct)

   
  await axios
  .put(`/products/${id}`, {updatedProduct, params: { id: id } } )
  .then((res) => {
    fetchProducts();
    alert(res.data.message);
  })
  .catch((error) => console.log({ error }));
};


    return (
        <>
            {isEdit ? 
                  <TableRow  ref={btnRef} hover role="checkbox" tabIndex={-1} key={item.id}>
                    {columnsProducts.map((column) => {
                      const value = product[column.id];
                      if (column.id === "productIMG" ) {    
                        return (
                            <TableCell  key={column.id} align={column.align} >
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
                          <TableCell  key={column.id} align={column.align}>
                            {value ? <p className="font-semibold">Liquid</p> :  <p className="font-semibold" >Non-Liquid</p>}
                          </TableCell>                                      
                        )
                      } else if(column.id === "rownumber") {
                          return(
                              
                              <TableCell  key={column.id} align={column.align}>
                                {value}  
                              </TableCell> 
                          )      
                      } else if(column.id === "categoryName") {
                           return( 
                            <TableCell  key={column.id} align={column.align}>
                                {value}  
                            </TableCell> )

                      }  else {
                        return(                             
                            <TableCell key={column.id} align={column.align}>
                              <TextField multiline key={item.id} name={column.id} value={value} onChange={handleChange} onKeyDown={onInputPress} />
                            </TableCell> 
                        )
                      }
                    })}
                  </TableRow>
                :
            
                  <TableRow onClick={editMode ? editFunction : ''} hover role="checkbox" tabIndex={-1} key={item.id}>
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
                          <TableCell key={column.id} align={column.align} style={{ maxWidth:  60}} >
                            {value ? <p className="font-semibold">Liquid</p> :  <p className="font-semibold" >Non-Liquid</p>}
                          </TableCell>                                      
                        )
                      } else {
                          return(
                              <TableCell key={column.id} align={column.align} style={{ maxWidth:  160}}>
                                  {value}
                              </TableCell> 
                          )      
                      } 
                    })}
                  </TableRow>
        }
      </>
    )
}

export default Tablebody