import React,{useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {TooltipComponent} from '@syncfusion/ej2-react-popups'
import {FiSettings} from 'react-icons/fi'
import { useDispatch } from "react-redux";
import { keepLoginAction } from './stores/actions';
import { useStateContext } from './contexts/ContextProvider'
import {Navbar, Footer, Sidebar} from './components'
import { Customers, Dashboard, Orders, Register, Transaction, Login, Products, Profile } from './pages'
import './App.css'

function App() {
    const { activeMenu, role, setRole, userId, setUserId, setActiveMenu, isLogin, setIsLogin  } = useStateContext();
    const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);
    const dispatch = useDispatch();


  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userData");
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
  

      const { id, username, name, role, tokens, photo, email } = userData;
    

      dispatch(keepLoginAction({ id, username, name, role, tokens, photo, email }));
      setIsLogin(true)
    }
   
   
    setIsLocalStorageChecked(true);
  }, []);

  return (
    <div>
     {isLogin ? 
        <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
            <div className='fixed right-4 bottom-4' style={{ zIndex: '1000'}}>
                <TooltipComponent
                    content="Settings"
                    position="Top"
                >
                    <button
                        type="button"
                        style={{ background: "blue", borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
                    </button>
                </TooltipComponent>
            </div>
            {activeMenu ? (
                <div className='w-72 fixed sidebar 
                dark:bg-secondary-dark-bg
                bg-white' >
                    <Sidebar/>
                </div>
            ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
                <Sidebar/>
            </div>)}
            <div className={ `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2' }` }>
                <div className='fixed md:static 
                    bg-main-bg dark:bg-main-dark-bg
                    navbar w-full'>
                        <Navbar/>
                </div>
                <div>
                    <Routes>
                        {/* Dashboard */}
                        <Route path='/' element={<Dashboard/>}/>
                        <Route path='/dashboard' element={<Dashboard/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        {/* Pages */}
                        <Route path='/customers' element={<Customers/>}/>
                        <Route path='/transaction' element={<Transaction/>}/>
                        <Route path='/products' element={<Products/>}/>
                        <Route path='profile' element={<Profile/>}/>
                    </Routes>
                </div>


            </div>
            

        </div>
        </BrowserRouter> :
      
        <BrowserRouter>
            <div className='flex relative ' >
              <Routes>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<Login/>}/>
              </Routes>
            </div>
          </BrowserRouter> }
     
    </div>
  )
}

export default App