import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { authActions } from "../store/reducers/auth-slice";
const useAxios = () => {
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.auth);
  const baseURL = useSelector((state) => state.baseUrl.url);
  const axiosInstance = axios.create({
    url: baseURL,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    try {
      const user = jwt_decode(access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) {
        return req;
      } else {
        try {
          const response = await axios.post(`${baseURL}/api/refresh/`, {
            access: access,
          });
          const data = await response.data;
          localStorage.setItem("access", data.access);
          req.headers.Authorization = `Bearer ${data.access}`;
          dispatch(authActions.login({ access: data.access }));
          return req;
        } catch (error) {
          dispatch(authActions.logout());
        }
      }
    } catch (error) {
      dispatch(authActions.logout());
    }
  });
  return axiosInstance;
};
export default useAxios;
