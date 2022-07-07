import React,{useState, useEffect} from 'react'

import { Typography,Container, Grid, TextField, ListItem, List, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, Avatar, CardContent,InputBase, Input, IconButton,  OutlinedInput, InputAdornment,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import axios from '../utils/axios'


function AddProduct({columnsProducts, setAdd, add}) {
  const initState = {
    category_id : '',
    productName : '',
    productDetails: '',
    productIMG: 'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg',
    isLiquid: '',
    isDeleted: 0,
    price: '',
  }
  const [ fileStatus, setFileStatus] = useState(false)
  const [ selectedFile, setSelectedFile ] = useState('')
  const [ newProduct, setNewProduct] = useState(initState)
  const [ category, setCategory] = useState('')
  const [ categories, setCategories] = useState([])
  const { category_id, productName, productDetails, productIMG, isDeleted, isLiquid, price} = newProduct
  
  
  const fileSelectedHandler = (e) => {
    setFileStatus(false)
   
    let uploaded = e.target.files[0]
    const ImageUrl = URL.createObjectURL(uploaded)
    setNewProduct({ ...newProduct, productIMG: ImageUrl });
    setSelectedFile(uploaded)
    setFileStatus(true)
  }

  const fileUploadHandler = () => {
      
    const fd = new FormData();
    fd.append("productPhoto", selectedFile)
    axios.post("/products/upload", fd)
    .then((res) => {
      const productIMG = res.data.image  
      setNewProduct({ ...newProduct, productIMG })   
      alert("image uploaded")
      setFileStatus(false)

      })
    .catch((error) => console.log({ error }));
  } 


  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
};

console.log(newProduct)


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



const addNewProduct = async () => {
         
await axios
.post("/products", { newProduct} )
.then((res) => {
 alert(res.data);
 setAdd(false)
  // window.location.reload()
})
.catch((error) => console.log({ error }));
};


  return (
        <TableRow hover role="checkbox" tabIndex={-1} key={0}>
          {columnsProducts.map((column) => {
            const value = newProduct[column.id]

           if (column.id == 'rownumber') {
             return(
              <TableCell key={column.id} align={column.align}>
                {category_id && productName && productDetails && isLiquid && price ? <button type="button" className='rounded-lg p-1 px-2 bg-slate-300' onClick={addNewProduct}>Add</button> : <div> Add </div>}
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
                    onClick={fileUploadHandler}
                  >
                    <p className='text-xs'>Save</p>
                  </button>}
                </div> 
              </TableCell>
            )
           } else if (column.id === "categoryName") {
            return(
              <TableCell key={column.id} align={column.align}>
                <Select
                  displayEmpty
                  defaultValue=""
                  name="category_id"
                  onChange={handleChange}
                >
                  <MenuItem value="">Choose</MenuItem>
                  {category && category.map((category) => (
                  <MenuItem  key={category.id} value={category.id}>
                  {category.categoryName}
                  </MenuItem>
                  ))}
                </Select>
              </TableCell>
            )
           } else if (column.id === 'isLiquid') {
            return(
              <TableCell key={column.id} align={column.align}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                   <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newProduct.isLiquid}
                   defaultValue="" name='isLiquid' onChange={handleChange} >
                   <MenuItem value='1'>Yes</MenuItem>
                   <MenuItem value='0'>No</MenuItem>
                   </Select>
                </FormControl>
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