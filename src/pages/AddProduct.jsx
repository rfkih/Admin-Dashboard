import React,{useState, useEffect} from 'react'

import { Typography,Container, Grid, TextField, ListItem, List, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import axios from '../utils/axios'


function AddProduct({columnsProducts}) {
  const initState = {
    category_id : '',
    productName : '',
    productDetails: '',
    productIMG: 'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg',
    isLiquid: '',
    price: '',
  }
  const [ fileStatus, setFileStatus] = useState(false)
  const [ selectedFile, setSelectedFile ] = useState('')
  const [ newProduct, setNewProduct] = useState(initState)
  const [ category, setCategory] = useState('')
  const [ categories, setCategories] = useState([])
  
  
  const fileSelectedHandler = (e) => {
    setFileStatus(false)
   
    let uploaded = e.target.files[0]
    const ImageUrl = URL.createObjectURL(uploaded)
    setNewProduct({ ...newProduct, productIMG: ImageUrl });
    setSelectedFile(uploaded)
    setFileStatus(true)
  }

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
};

category.map((name)=>{
  if (newProduct.category_id == name.id) {  
      newProduct.categoryName = name.categoryName
  }
})


const fetchCategories = async () => {
  try {
      const res = await axios.get("/categories");
      const  categories = res
      const category = categories.data
      setCategory(category)
      setCategories(category)
  } catch (error) {
      console.log(alert(error.message));
  }
};

useEffect(() => {
  fetchCategories();
},[])


  return (
        <TableRow hover role="checkbox" tabIndex={-1} key={0}>
          {columnsProducts.map((column) => {
            const value = newProduct[column.id]

           if (column.id == 'rownumber') {
             return(
              <TableCell key={column.id} align={column.align}>
                Add
              </TableCell>
             )
           }else if(column.id == 'productIMG') {
            return (
              <TableCell key={column.id} align={column.align}>
                <div className='flex flex-col items-center'>
                  <input
                    onChange={fileSelectedHandler}
                    className='hidden'
                    type="file"
                    id="upload-file"                  
                  />
                  <label htmlFor='upload-file'>
                    <img
                      className={fileStatus ? `rounded-t-md h-16 w-24 mr-2` : 'rounded-md h-20 w-24 mr-2'}
                      src={value}
                      alt="Upload Image"
                      />
                  </label>
                  {fileStatus && 
                  <button
                    className=' h-5 rounded-b-md w-full bg-slate-300'
                    // onClick={fileUploadHandler}
                  >
                    <p className='text-xs'>Save</p>
                  </button>}
                </div> 
              </TableCell>
            )
           } else if (column.id === "categoryName") {
            return(
              <TableCell key={column.id} align={column.align}>
                  test
              </TableCell>
            )
           } else if (column.id === 'isLiquid') {
            return(
              <TableCell key={column.id} align={column.align}>
                  isLiquid
              </TableCell>
            )

           } else {
            return(
              <TableCell key={column.id} align={column.align}>
                  <TextField multiline key={column.id} name={column.id} value={value} onChange={handleChange}  />
              </TableCell>
            )
           }
          })}
            
        </TableRow>
  
  )
}

export default AddProduct