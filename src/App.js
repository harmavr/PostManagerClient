import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authenticated, notAuthenticated } from "./redux/actions";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const authStateLogin = useSelector((state) => state.login);
  const authStateUsername = useSelector((state) => state.username);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          // Handle the case where the token is not present in localStorage
          dispatch(notAuthenticated());
          return;
        }

        const response = await axios.get("http://localhost:3001/auth/auth", {
          headers: {
            accessToken: token,
          },
        });
        if (response.data.error) {
          dispatch(notAuthenticated());
        } else {
          const { username, id, login = true, token: newToken } = response.data;

          localStorage.setItem("accessToken", newToken);
          dispatch(authenticated(username, id, login));
        }
      } catch (error) {
        dispatch(notAuthenticated());
      }
    };

    checkAuthStatus();
  }, [authStateLogin]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(notAuthenticated());
  };

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <div className="links">
            <p></p>
            {!authStateLogin ? (
              <>
                {" "}
                <Link to="login">Login</Link>
                <Link to="registration">Registration</Link>{" "}
              </>
            ) : (
              <>
                {" "}
                <Link to="createpost">Create A post</Link>
                <Link to="/">Home Page </Link>
              </>
            )}
          </div>
          <div className="loggedInContainer">
            <h1>{authStateUsername}</h1>
            {authStateLogin && <button onClick={logout}>Logout</button>}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
