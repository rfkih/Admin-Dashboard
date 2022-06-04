  export const loginAction = ({ id, username, role, token, photo, email }) => {
      localStorage.setItem(
        "userData",
        JSON.stringify({ id, username, role, token, photo, email })
      );
      
      return {
        type: "LOGIN_SUCCESS",
        payload: { id, username, role, token, photo, email },
      };
    };

  export const keepLoginAction = ({ id, username, role, token, photo, email }) => {
    return {
      type: "LOGIN_SUCCESS",
      payload: { id, username, role, token, photo, email },
    };
  };
  
  export const logoutAction = () => {
    localStorage.removeItem("userData");
    return {
      type: "LOGOUT_SUCCESS",
    };
  };