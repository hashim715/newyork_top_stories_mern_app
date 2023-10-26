import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OutletPage from "./Outlet/OutletPage";
import Home from "./components/main_pages/home";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./components/main_pages/login";
import Register from "./components/main_pages/register";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import LoginProtected from "./ProtectedRoutes/LoginProtected";
const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<OutletPage />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
          <Route
            exact
            path="/login"
            element={
              <LoginProtected>
                <Login />
              </LoginProtected>
            }
          ></Route>
          <Route
            exact
            path="/register"
            element={
              <LoginProtected>
                <Register />
              </LoginProtected>
            }
          ></Route>
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
