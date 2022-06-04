import React, {createContext, useContext, useState} from 'react'


const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}


export const ContextProvider = ({children}) => {
    const [ activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(undefined)
    const [ isClicked, setIsClicked] = useState(initialState);
    const [ isLogin, setIsLogin ] = useState(false)
    const [ role, setRole ] = useState('user')
    const [ userId, setUserId] = useState(0)
    const [ username, setUsername ] = useState('')
    const [ currentColor, setCurrentColor] = useState('blue')



    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked]: true})
    }

   
    
    return (
        <StateContext.Provider
            value={{ currentColor, setCurrentColor, role, setRole, userId, setUserId, username, setUsername, activeMenu, setActiveMenu, initialState, screenSize, setScreenSize, isClicked, setIsClicked, handleClick, isLogin, setIsLogin }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext (StateContext)