  export const loginAction = ({ id, username, role, token, photo, email, name }) => {
      localStorage.setItem(
        "userData",
        JSON.stringify({ id, username, name, role, token, photo, email })
      );
      
      return {
        type: "LOGIN_SUCCESS",
        payload: { id, username, name, role, token, photo, email },
      };
    };

  export const keepLoginAction = ({ id, username, name, role, token, photo, email }) => {
    localStorage.setItem(
      "userData",
      JSON.stringify({ id, username, name, role, token, photo, email })
    );
    
    return {
      type: "LOGIN_SUCCESS",
      payload: { id, username, name, role, token, photo, email },
    };
  };



  export const updateAction = ({photo, email, name}) => {
    localStorage.setItem(
      "updateData",
      JSON.stringify({photo, email, name})
    );
    return {
      type: "UPDATE_DATA",
      payload: { photo, name,  email, }
    }
  }

  // export const emailAction = ({email}) => {
  //   localStorage.setItem("emailData", JSON.stringify({email}));
  //   return {
  //     type: "UPDATE_EMAIL",
  //     payload: {email}
  //   }
  // }

  // export const nameAction = ({name}) => {
  //   localStorage.setItem("nameData", JSON.stringify({name}));
  //   return {
  //     type: "UPDATE_NAME",
  //     payload: {name}
  //   }
  // }

  
  export const logoutAction = () => {
    localStorage.removeItem("userData");
    return {
      type: "LOGOUT_SUCCESS",
    };
  };