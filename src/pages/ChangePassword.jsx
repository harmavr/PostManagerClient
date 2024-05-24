import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        }
      });
  };

  return (
    <div className="changePasswordContainer">
      <h1>Change your password</h1>
      <input
        type="password"
        className="oldPassword"
        placeholder="Old password"
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="password"
        className="newPassword"
        name=""
        id=""
        placeholder="New password"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <div className="saveNewPasswordIcon">
        <SaveIcon onClick={changePassword} />
      </div>
    </div>
  );
}
