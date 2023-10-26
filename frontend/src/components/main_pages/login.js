/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../../store/reducers/notification-slice";
import { LoginAction } from "../../store/actions/auth-actions";
const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.notification.notification);
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(LoginAction(username, password));
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
          <h1 style={{ textAlign: "center" }}>Login in Please</h1>
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
            <h5>Do you want to register click here?</h5>
            <a class="btn btn-primary" href="/register" role="button">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
