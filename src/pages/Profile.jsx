import React,{useEffect, useState} from 'react'
import {Header} from '../components'
import  {useSelector} from 'react-redux'
import axios from '../utils/axios'

function Profile() {
  const [ userData,setUserData] = useState([])
  const { gender, name, email} = userData
  const { username, role, id, photo } = useSelector((state) => {
    return state.auth;
  });





  const fetchUserById = async () => {
    try {
     
        const res = await axios.get(`/users/${id}`,{ params: { id: id } } )
        const {data} = res
        setUserData(data[0])
        
    } catch (err) {
    console.log({ err });
        
    }
}

useEffect(() => {
  fetchUserById()
}, [])







  return (
    <div className='m-2 md:m-10 p-2 md:p-10'>
        <Header category="Page" title="Profile"/>
        <div className='flex h-content justify-between rounded-xl border-2 border-color bg-slate-100 '>
            <div className='flex w-2/6 py-10 flex-col p-2 bg-slate-100 '>
                <div className='px-2 gap-5 items-center mt-4'>
                <img
                  className='rounded-md  w-full h-content '
                  src={photo}
                  alt="User Profile"
                />
                <button
                  className='w-full h-content mt-3 border-1 rounded-md border-black bg-white'
                >
                  <p className='text-md py-1'> Choose Photo </p>
                </button>
                </div>
            </div>
            <div className='flex w-4/6 py-10 flex-col bg-slate-200'>  
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
                      <p className='mx-2 font-semibold text-md'>{name}</p> <p className='text-sm hover:text-slate-500 hover:cursor-pointer'>change</p>
                    </div>
                    <div className='flex justify-start'>
                      <p className='mx-2 font-semibold text-md'>{gender}</p> <p className='text-sm hover:text-slate-500 hover:cursor-pointer'>change</p>
                    </div>
                    <div className='flex justify-start'>
                      <p className='mx-2 font-semibold text-md'>{email}</p> <p className='text-sm hover:text-slate-500 hover:cursor-pointer'>change</p>
                    </div>                
                 </div>
              </div>
            </div>
        </div>
        
    </div>
  )
}

export default Profile