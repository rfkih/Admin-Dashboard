const initData = {
    photo: '',
    email: '',
    name : '',
  }



  const updateReducer = (state = initData, action) => {
      console.log(action.payload)
    switch (action.type) {     
      case "UPDATE_DATA":
          return {
            ...state,
            photo: action.payload.photo,
            name: action.payload.name,
            email: action.payload.email,
          }
      case "LOGOUT_SUCCESS":
        return initData;
  
      default:
        return state;
    }
  };
  
  export default updateReducer;