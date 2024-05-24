import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticated } from "../redux/actions";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data.token);
        dispatch(authenticated());

        navigate("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label htmlFor="">Username</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
