import React,{useEffect, useState} from 'react'
import {Header} from '../components'
import  {useSelector, useDispatch} from 'react-redux'
import axios from '../utils/axios'


function Profile() {
  const [ userData, setUserData] = useState([])

  const [ fileStatus, setFileStatus] = useState(false)
  const [ updatePhoto, setUpdatePhoto ] = useState(false)
  const [ selectedFile, setSelectedFile] = useState(null)
  const { gender, name, email, photo} = userData
  const { username, role, id} = useSelector((state) => {
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


const fileSelectedHandler = (e) => {
  // setFileStatus(false)
  console.log(e.target.files[0])
  let uploaded = e.target.files[0]
  const ImageUrl = URL.createObjectURL(uploaded)
  setUserData({ ...userData, photo: ImageUrl });
  setSelectedFile(uploaded)
  setFileStatus(true)
}

useEffect(() => {
  if (fileStatus) {
    onSavePhoto()
  }
  setFileStatus(false)
},[fileStatus])

useEffect(() => {
  if (updatePhoto) {
    console.log("timeout")
    // setTimeout(fetchUserById, 1000)
    
  }
  setUpdatePhoto(false)
},[updatePhoto])


const onSavePhoto = async () => {
  const { id, token } = JSON.parse(localStorage.getItem("userData"));
  console.log("jalan")
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
    console.log(Image)
    // setUserData({ ...userData, photo: Image });
   
    alert("Update Success");
    setUpdatePhoto(true) 
  

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};









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