import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useSelector } from "react-redux";

export default function Profile() {
  let { id } = useParams();
  console.log();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  const authUsername = useSelector((state) => state.username);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/profile/${id}`).then((res) => {
      setUsername(res.data.username);
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>
          Usermame: {username}{" "}
          {authUsername === username && (
            <ManageAccountsIcon
              onClick={() => {
                navigate("/changepassword");
              }}
            />
          )}
        </h1>

        {listOfPosts.map((value, key) => {
          return (
            <div className="post" key={key}>
              <div className="title">{value.title}</div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="listOfPosts"></div>
    </div>
  );
}
