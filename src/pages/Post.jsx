import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const authUsername = useSelector((state) => state.username);
  const [title, setTitle] = useState(postObject.title || "");
  const [postText, setPostText] = useState(postObject.postText || "");
  const [editTitle, setEditTitle] = useState(false);
  const [editText, setEditText] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((res) => {
      setPostObject(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        `http://localhost:3001/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          // alert(res.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/");
      });
  };

  const handleEditTitleClick = () => {
    setTitle(postObject.title); // Set the title to the old title when the edit button is clicked
    setEditTitle((edit) => (edit = !edit));
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const saveTilte = (newTitle) => {
    setEditTitle((edit) => (edit = !edit));
    setTitle(newTitle);
    axios.put(
      `http://localhost:3001/posts/title`,
      {
        newTitle: newTitle,
        id: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    setPostObject({ ...postObject, title: newTitle });
  };

  const handleEditTextClick = () => {
    setPostText(postObject.postText); // Set the title to the old title when the edit button is clicked
    setEditText((edit) => (edit = !edit));
  };

  const handleTextChange = (newText) => {
    setPostText(newText);
  };

  const saveText = (newText) => {
    setEditText((edit) => (edit = !edit));
    setPostText(newText);
    axios.put(
      `http://localhost:3001/posts/postText`,
      {
        newText: newText,
        id: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    setPostObject({ ...postObject, postText: newText });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">
            {!editTitle ? (
              <>
                {postObject.title}
                {authUsername === postObject.username && (
                  <div className="editTitleBttn">
                    <EditIcon onClick={handleEditTitleClick} />
                  </div>
                )}
              </>
            ) : (
              <div className="input">
                <input
                  type="text"
                  className="titleInput"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                />
                <div className="checkTitleIcon">
                  <CheckIcon onClick={() => saveTilte(title)} />
                  <CloseIcon
                    onClick={() => {
                      setEditTitle((edit) => (edit = !edit));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="body">
            {!editText ? (
              <>
                {postObject.postText}
                {authUsername === postObject.username && (
                  <div className="editTextBttn">
                    <EditIcon onClick={handleEditTextClick} />
                  </div>
                )}
              </>
            ) : (
              <div className="input">
                <textarea
                  type="text"
                  value={postText}
                  className="textInput"
                  onChange={(event) => handleTextChange(event.target.value)}
                />
                <div className="checkIcon">
                  <CheckIcon onClick={() => saveText(postText)} />
                  <CloseIcon
                    onClick={() => {
                      setEditText((edit) => (edit = !edit));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="footer">
            {postObject.username}{" "}
            {authUsername === postObject.username && (
              <button onClick={() => deletePost(postObject.id)}>
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comments</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authUsername === comment.username && (
                  <button onClick={() => deleteComment(comment.id)}>X</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
