import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/auth-slice";
import { notificationAction } from "../../store/reducers/notification-slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification.notification);
  const [show, setShow] = useState(true);
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/register/`, {
        username: username,
        email: email,
        first_name: first_name,
        password: password,
        last_name: last_name,
      });
      const { access } = await response.data;
      localStorage.setItem("access", access);
      dispatch(authActions.login({ access: access }));
      navigate("/");
    } catch (err) {
      dispatch(
        notificationAction.notification({
          message: err.response.data.message,
          type: "danger",
          show: true,
        })
      );
    }
    setTimeout(() => {
      setShow(false);
      dispatch(
        notificationAction.notification({
          message: "",
          type: "",
          show: false,
        })
      );
    }, 3000);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (notification) {
      setShow(true);
    }
  }, [notification]);
  return (
    <div className="container" style={{ marginTop: "10%" }}>
      {show && notification && notification.show && (
        <div
          className={`alert alert-${notification.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>Alert!</strong> {notification.message}
        </div>
      )}
      <div
        className="row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="col-8"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            className="mb-4"
            src="assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
        </div>
        <div className="col-8">
          <h1 style={{ textAlign: "center" }}>Register Here</h1>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <h5>Already Registered?</h5>
            <a class="btn btn-primary" href="/login" role="button">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
