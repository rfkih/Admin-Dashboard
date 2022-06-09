const initPhoto = {
    photo: '',
  }



  const photoReducer = (state = initPhoto, action) => {
    switch (action.type) {
      case "UPDATE_PHOTO":
        
        return {
          ...state,
          photo: action.payload.photo
        };
  
      case "LOGOUT_SUCCESS":
        return initPhoto;
  
      default:
        return state;
    }
  };
  
  export default photoReducer;