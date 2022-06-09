const init = {
    id: 0,
    username: "",
    name:'',
    role: "",
    token: "",
    photo: "",
    email: '',
    berhasil: "hore",
  };




  const authReducer = (state = init, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        
        return {
          ...state,
          id: action.payload.id,
          username: action.payload.username,
          name: action.payload.name,
          role: action.payload.role,
          token: action.payload.token,
          email: action.payload.email,
          photo: action.payload.photo
        };
  
      case "LOGOUT_SUCCESS":
        return init;
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  