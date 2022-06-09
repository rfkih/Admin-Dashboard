  export const loginAction = ({ id, username, role, token, photo, email, name }) => {
      localStorage.setItem(
        "userData",
        JSON.stringify({ id, username, name, role, token, photo, email })
      );

      localStorage.setItem("UserPhoto", JSON.stringify({ photo }) )
      
      return {
        type: "LOGIN_SUCCESS",
        payload: { id, username, name, role, token, photo, email },
      };
    };

  export const keepLoginAction = ({ id, username, name, role, token, photo, email }) => {
    return {
      type: "LOGIN_SUCCESS",
      payload: { id, username, name, role, token, photo, email },
    };
  };

  export const photoAction = ({photo}) => {
    localStorage.setItem(
      "photoData",
      JSON.stringify({photo})
    );
    return {
      type: "UPDATE_PHOTO",
      payload: { photo }
    }
  }

  
  export const logoutAction = () => {
    localStorage.removeItem("userData");
    return {
      type: "LOGOUT_SUCCESS",
    };
  };