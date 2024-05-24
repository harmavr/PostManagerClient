import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";

export default function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("You must input a username"),
    password: Yup.string().min(4).max(20).required("You must input a password"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
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
          <label htmlFor="username">Username</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePostUsername"
            name="username"
            placeholder="(Example Charis...)"
          />
          <label htmlFor="password">Password</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePostPassword"
            name="password"
            placeholder="Your password"
            type="password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
