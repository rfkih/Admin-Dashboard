import React,{useEffect, useState} from 'react'
import {Header} from '../components'
import  {useSelector, useDispatch} from 'react-redux'
import { Dialog, TextField, DialogActions, DialogContent, RadioGroup, FormControlLabel, Radio, Button, DialogContentText, DialogTitle} from '@mui/material'
import axios from '../utils/axios'

import {photoAction} from '../stores/actions'
import { width } from '@mui/system'
import { Direction } from '@syncfusion/ej2-react-charts'


function Profile() {
  const [ userData, setUserData] = useState([])
  const [ initData, setInitData] = useState([])
  const dispatch = useDispatch();
  const [ fileUpdate, setFileUpdate] = useState(false)
  const [ fileStatus, setFileStatus] = useState(false)
  const [ selectedFile, setSelectedFile] = useState(null)
  const [ openName, setOpenName] = useState(false)
  const [ openGender, setOpenGender] = useState(false)
  const [ openEmail, setOpenEmail ] = useState(false)
  const { gender, name, email, photo} = userData
  const { username, role, id} = useSelector((state) => {
    return state.auth;
  });





  const fetchUserById = async () => {
    try {
     
        const res = await axios.get(`/users/${id}`,{ params: { id: id } } )
        const {data} = res
        setUserData(data[0])
        setInitData(data[0])
    } catch (err) {
    console.log({ err });
        
    }
}

useEffect(() => {
  fetchUserById()
}, [])


const fileSelectedHandler = (e) => {
 
  console.log(e.target.files[0])
  let uploaded = e.target.files[0]
  const ImageUrl = URL.createObjectURL(uploaded)
  setUserData({ ...userData, photo: ImageUrl });
  setSelectedFile(uploaded)
  setFileStatus(true)
  
};

const handleClose = () => {
  setOpenName(false);
  setOpenGender(false)
  setOpenEmail(false)
};

useEffect(() => {
  if (fileStatus) {
    onSavePhoto()
  }
  setFileStatus(false)
},[fileStatus])

useEffect(() => {
  if(fileUpdate){
    updateUser();
  }
  setFileUpdate(false)
},[userData])



const onSavePhoto = async () => {
  const { id, token } = JSON.parse(localStorage.getItem("userData"));
  
  try {
    const formData = new FormData();
    formData.append("photo", selectedFile);

    const response = await axios.put(
      `/users/edit-profile-picture/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const Image = response.data.Image;
    setFileUpdate(true)
    const payload = {photo: Image}
    const actionObj = photoAction(payload);
    dispatch(actionObj)
    setUserData({ ...userData, photo: Image }); 

  } catch (error) {
    console.log(error);
  }
};

const updateUser = async () => {      
  const updatedUserData = {
    gender, name, email, photo
  };
 
await axios
.put(`/users/update/${id}`, {updatedUserData, params: { id: id } } )
.then((res) => {
  alert(res.data.message);
  fetchUserById()
})
.catch((error) => {
  setUserData(initData)
  alert(error.response.data.message)
} );
};



const NameDialog = () => {
  const [nameDialog, setNameDialog] = useState('')

  const handleChange = (e) => {
    setNameDialog( e.target.value );
};

  const onSave = () => (
    setFileUpdate(true),
    setUserData({ ...userData, name: nameDialog }),
    setOpenName(false)
  )

  return (
    <Dialog fullWidth maxWidth="sm" open={openName} onClose={handleClose}>
      <DialogTitle>Change your Name</DialogTitle>
      <DialogContent>
          <DialogContentText>
            Type Your New Name Here !
          </DialogContentText>
       
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={nameDialog}
            onChange={handleChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions style={{display: 'flex', paddingBottom:"1em", justifyContent:'space-around'}}>
          <Button onClick={onSave} style={{borderRadius:"10px", width:"10em", color:"white", backgroundColor:"blue"}}>Save</Button>
        </DialogActions>
    </Dialog>
  )
}

const GenderDialog = ({}) => {
  const [genderDialog, setGenderDialog] = useState('FEMALE')

  const handleChange = (e) => {
    setGenderDialog( e.target.value );
};

  const onSave = () => (
    setFileUpdate(true),
    setUserData({ ...userData, gender: genderDialog }),
    setOpenGender(false)
  )

  return (
    <Dialog fullWidth maxWidth="sm" open={openGender} onClose={handleClose}>
      <div className='flex row w-full   items-center justify-center mx-5' >
      <DialogTitle>Change your Gender</DialogTitle>
      </div>
      <DialogContent>
        <div className='flex row w-full text-xl -mt-3  items-center justify-center m-2'>
          <DialogContentText>
            Select Your New Gender!
          </DialogContentText>     
        </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="FEMALE"
              name="gender"
              onChange={handleChange}
            >
              <div className='flex row w-full  items-center justify-around mx-5'>
              <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
              <FormControlLabel value="MALE" control={<Radio />} label="Male" />
              </div>
            </RadioGroup>
          
        </DialogContent>
        <DialogActions style={{display: 'flex', paddingBottom:"1em", justifyContent:'space-around'}}>
          <Button onClick={onSave} style={{borderRadius:"10px", width:"10em", color:"white", backgroundColor:"blue"}}>Save</Button>
        </DialogActions>
    </Dialog>
  )
}

const EmailDialog = () => {
  const [emailDialog, setEmailDialog] = useState('')

  const handleChange = (e) => {
    setEmailDialog( e.target.value );
};

  const onSave = () => (
    setFileUpdate(true),
    setUserData({ ...userData, email: emailDialog }),
    setOpenEmail(false)
  )

  return (
    <Dialog fullWidth maxWidth="sm" open={openEmail} onClose={handleClose}>
      <DialogTitle>Change your Email</DialogTitle>
      <DialogContent>
          <DialogContentText>
            Type Your New Email Here !
          </DialogContentText>      
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Email"
            type="email"
            fullWidth
            value={emailDialog}
            onChange={handleChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions style={{display: 'flex', paddingBottom:"1em", justifyContent:'space-around'}}>
          <Button onClick={onSave} style={{borderRadius:"10px", width:"10em", color:"white", backgroundColor:"blue"}}>Save</Button>
        </DialogActions>
    </Dialog>
  )
}









  return (
    <div className='m-2 md:m-10 p-2 md:p-10'>
        <Header category="Page" title="Profile"/>
        <div className='flex h-content justify-between rounded-xl border-2 border-color  '>
            <div className='flex w-2/6 py-10 flex-col p-2 bg-white '>
                <div className='px-2 gap-5 items-center mt-4'>             
                <img
                  className='rounded-md  w-full h-content '
                  src={photo}
                  alt="User Profile"
                />          
                <button
                  className='w-full h-content mt-3 border-1 rounded-md border-black bg-white '
                >
                   <input
                    onChange={fileSelectedHandler}
                    className='hidden '
                    type="file"
                    id="upload-file"                  
                />
                <label htmlFor='upload-file' >
                  <p className='text-md py-1 hover:cursor-pointer'> Choose Photo </p>
                  </label>
                </button>         
                </div>
            </div>
            <div className='flex w-4/6 py-10 flex-col bg-slate-100'>  
              <div className='mt-3 mx-2'>
                <p className='mx-2 font-bold text-lg'>Personal Data</p>
              </div>   
              <div className='flex w-full flex-between p-2 '>
                 <div className='flex flex-col gap-4 w-2/6'>
                    <p className='mx-2 font-semibold text-md'>Name</p>
                    <p className='mx-2 font-semibold text-md'>Gender</p>
                    <p className='mx-2 font-semibold text-md'>Email</p>
                 </div>
                 <div className='flex flex-col gap-4 w-4/6'>
                    <div className='flex justify-start'>
                      <p className='mx-2 font-semibold text-md'>{name}</p> <p onClick={() => setOpenName(true)} className='text-sm hover:text-slate-500 hover:cursor-pointer'>change</p>
                    </div>
                    <div className='flex justify-start'>
                      <p className='mx-2 font-semibold text-md'>{gender}</p> <p onClick={() => setOpenGender(true)} className='text-sm hover:text-slate-500 hover:cursor-pointer'>change</p>
                    </div>
                    <div className='flex justify-start'>
                      <p className='mx-2 font-semibold text-md'>{email}</p> <p onClick={() => setOpenEmail(true)} className='text-sm hover:text-slate-500 hover:cursor-pointer'>change</p>
                    </div>                
                 </div>
              </div>
            </div>
        </div>
        <NameDialog/>
        <GenderDialog/>
        <EmailDialog/>
    </div>
  )
}

export default Profile