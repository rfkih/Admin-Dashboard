import React,{useEffect, useState} from 'react'
import { TextField, FormControl, Radio, IconButton, RadioGroup, FormLabel, FormControlLabel, OutlinedInput, InputLabel, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, NavLink,  Navigate } from 'react-router-dom'
import { loginAction } from '../stores/actions';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../utils/axios'
import { useStateContext  } from '../contexts/ContextProvider';

import './Style.css'
import { borderColor, borderRadius } from '@mui/system'

function Login() {
  const { activeMenu, setActiveMenu, setIsLogin  } = useStateContext();
  const dispatch = useDispatch();
  const { username, role, id } = useSelector((state) => {
    return state.auth;
  });
  const initialState = { username: '', password: ''}
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState(initialState)
  

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); 
  }

  const onInputPress = (e) => {
    if (e.code === "Enter") onLogin();
  };

  const onLoginClick = () => {
    onLogin();
  };


  const onLogin = async () => {
    try {
      const res = await axios.post("/users/login", {
        username: formState.username,
        password: formState.password,
      });
      const payload = res.data;

      const actionObj = loginAction(payload);
      console.log(actionObj);
      dispatch(actionObj);
    } catch (error) {
      console.log(error.response.data);
    }
  };


  if (username) {
    setIsLogin(true)
    return <Navigate to="/" replace />;
  }




  return (
    <>  
    <div className=" flexlogin flex-col  header h-screen static w-full">  
      <div className='flexlogin flex-col md:flex-row md:absolute  w-full '>
        <div className='flex flex-col justify-center items-center md:bg-white  md:h-screen text-2xl w-full  md:w-4/6 '>
          <div className='flexlogin  flex-col justify-center items-center mt-10 md:bg-white-400 w-4/6'>
            <h1 className=' text-2xl xl:text-5xl my-4 md:text-sky-700 font-semibold'>Login to Your Account</h1>
            <div className='flexlogin flex-col w-full md:w-4/5 p-5 justify-around'>
              <TextField onChange={handleChange}  style={{margin : '0.5em', backgroundColor : 'white' , borderRadius: '5px' }} size="small" type="text" id="Username" fullWidth label="Username" variant="outlined" name='username'  />
              <FormControl fullWidth size="small"  style={{margin : '0.5em', backgroundColor : 'white' , borderRadius: '5px' }} variant='outlined'>
                <InputLabel htmlFor="outlined-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-password"
                  label="Password" 
                  name="password"
                  size="small" 
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={formState.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  }
                >
                </OutlinedInput>
              </FormControl>
              <button
                type='button'
                style={{backgroundColor: "blue", color: "white", borderRadius: '26px'}}
                className={`text-md mt-4 w-3/4 rounded-xl  py-2 mx-4`}
                onClick={onLoginClick}
                onKeyDown={onInputPress}
              >
                Login
              </button>

            </div>
          
          </div>
        </div>
        <div className=' w-full relative  md:w-2/6'>
          <div className=' flexlogin flex-col mx-4'>
            <h1 className='font-semibold '> New Here ?</h1>
            <p className='text-2xl m-4 text-white'> Sign up and discover a great amount of new opportunities!</p>
            <button
                type='button'
                style={{backgroundColor: "blue", color: "white", borderRadius: '26px'}}
                className={`text-md mt-4 w-3/5 rounded-xl  py-2 mx-4`}
                component={Link}
                to='/register'
              >
                <NavLink to='/register' >
                  Register
                </NavLink>           
              </button>

          </div>
          
        </div>

      </div>
      <div className="inner-header "/>     
        <div className='w-full   '>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use href="#gentle-wave" x="48" y="0" fill="rgb(81, 61, 183)" />
                    <use href="#gentle-wave" x="48" y="3" fill="rgb(73, 74, 185, 0.5)" />
                    <use href="#gentle-wave" x="48" y="5" fill="rgb(8, 160, 192, 0.5)" />
                    <use href="#gentle-wave" x="48" y="7" fill="rgb(8, 160, 192)" />
                </g>
            </svg>
        </div>
    </div>   
  </>
  )
}

export default Login