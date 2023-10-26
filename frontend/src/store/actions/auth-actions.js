import axios from "axios";
import { authActions } from "../reducers/auth-slice";
import { notificationAction } from "../reducers/notification-slice";

export const LoginAction = (username, password) => {
  return async (dispatch) => {
    const login = async () => {
      const response = await axios.post("http://localhost:5000/api/login/", {
        username: username,
        password: password,
      });
      const { access } = await response.data;
      localStorage.setItem("access", access);
      return { access: access };
    };
    try {
      const data = await login();
      dispatch(authActions.login(data));
    } catch (error) {
      dispatch(
        notificationAction.notification({
          message: error.response.data.message,
          type: "warning",
          show: true,
        })
      );
      window.scrollTo(0, 0);
    }
  };
};
