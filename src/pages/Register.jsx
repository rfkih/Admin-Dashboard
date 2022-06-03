import React, {useState, useEffect} from 'react'

import { TextField, Button, FormControl, Radio, RadioGroup, FormLabel, FormControlLabel, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import axios from '../utils/axios';
// import './Style.css'
function Register() {
  const initFormState = {
    username: "",
    name:"",
    gender:"FEMALE",
    email: "",
    password: "",
    password2: "",
  };
  const [ formState, setFormState] = useState(initFormState)
  const [open, setOpen] = useState(false)
  const { username, name, gender, email, password, password2 } = formState;


  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };


  const checkFirst = () => {
    if (password === password2) {
      onRegisterClick()
    }else{
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  const onRegisterClick = async () => {
    try {
      const newUser = {
        role: "admin",
        username, name, gender, email, password,
      };
      await axios.post("/users/register", newUser);
      setFormState(initFormState);
      alert("Registrasi berhasil & verifikasi account melalui Email");
    } catch (error) {
      alert("Registrasi gagal");
    }
  };






  return (
    <> 
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-password"
          aria-describedby="alert-password"
        >
          <DialogContent>
            <DialogContentText id="alert-password">
             Your Password doesn't match!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
      <div className="header static w-full">
          <div className='flex  flex-grow flex-col justify-center items-center absolute w-full' style={{ zIndex: 10}}>
          <div className='mt-16 bg-slate-100 w-5/6 md:w-4/6 lg:w-3/6 max-w-lg  h-fit rounded-xl'>
              <h1 className='text-sky-500 text-xl font-semibold mx-11 my-6'> Create an Account</h1>
              <div className='flexlogin flex-col p-4 m-3 '>
                <FormControl  fullWidth >
                  <TextField onChange={handleChange} value={name} style={{margin : '0.5em'}} size="small" type="text" id="Name" fullWidth label="Name" variant="outlined" name='name'  />
                  <div className=' flex flex-col w-28 justify-between items-start  mx-4  text-black '>
                    <p className=''>
                      Select Gender
                    </p>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="FEMALE"
                      name="gender"
                      onChange={handleChange}
                    >
                      <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                      <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </div>
                  <TextField onChange={handleChange} value={username} style={{margin : '0.5em'}} size="small" type="text" id="Username" fullWidth label="Username" variant="outlined" name='username'  />
                  <TextField onChange={handleChange} value={email} style={{margin : '0.5em'}} size="small" type="email" id="Email" fullWidth label="Email" variant="outlined" name='email'  />
                  <TextField onChange={handleChange} value={password} style={{margin : '0.5em'}} size="small" type="password" id="Password" fullWidth label="Password" variant="outlined" name='password'  />
                  <TextField onChange={handleChange} value={password2} style={{margin : '0.5em'}} size="small" type="password" id="Password2" fullWidth label="Retype-Password" variant="outlined" name='password2'  />
                </FormControl>
              </div>
              <div className='flex justify-around gap-6 mx-5  p-2 w-full -mt-3  '>
                  <p className=' flex justify-center flex-col text-xs md:flex-row md:text-sm'>
                      <span>Already Have an Account ? </span>
                      <NavLink to='/login'>Click Here</NavLink>
                  </p>
                  <button
                    type='button'
                    style={{backgroundColor: "blue", color: "white", borderRadius: '10px'}}
                    className={`text-md p-3 hover:drop-shadow-xl hover:bg-black py-2 mx-4`}
                    onClick={checkFirst}
                  >
                      Register
                  </button>
              </div>
          </div>
          </div>
          <div class="inner-header"/>     
          <div>
              <svg class="waves" xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink"
               viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                  <defs>
                      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                  </defs>
                  <g class="parallax">
                      <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                      <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                      <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                      <use href="#gentle-wave" x="48" y="7" fill="#fff" />
                  </g>
              </svg>
          </div>
      </div>   
    </>
  )
}

export default Register