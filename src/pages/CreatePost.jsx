import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const authState = useSelector((state) => state.login);
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label htmlFor="title">Title</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Example Title...)"
          />
          <label htmlFor="postText">Post</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Example Post...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}
