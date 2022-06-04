import React from 'react'
import { MdOutlineCancel} from 'react-icons/md'
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { Button} from '.'
import { useStateContext } from '../contexts/ContextProvider';
import { logoutAction } from '../stores/actions';
import { useDispatch, useSelector } from 'react-redux';

const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];

function UserProfile() {
  const dispatch = useDispatch();
  const {currentColor, setIsLogin} = useStateContext();

  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logoutAction());
    setIsLogin(false); 
    navigate('/')
   
    
  };
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-lg dark:text-gray-200'> User Profile</p>
        <Button
          icon={<MdOutlineCancel/>}
          color="grey"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
        <img
          className='rounded-full h-24 w-24'
          src={'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8anBnfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}
          alt="User Profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> Michael Roberts </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Administrator   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> info@shop.com </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D] ">
            <button
              type='button'
              style={{color: item.iconColor, backgroundColor: item.iconBg}}
              className="text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>
            <div>
              <p className='font-semibold dark:text-gray-200'>{item.title}</p>
              <p className='text-gray-500 text-sm dark:text-gray-400'>{item.desc}</p>
            </div>

          </div>
        ))}
      </div>
      <div className='mt-5'>
        <button
          type='button'
          onClick={onLogoutClick}
          style={{backgroundColor: currentColor, color:"white", borderRadius:"15px"}}
          className={`text-xl p-3 w-full py-2 hover:drop-shadow-xl hover:bg-white`}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserProfile