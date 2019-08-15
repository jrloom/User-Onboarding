import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = () => {
  return (
    <div className="container">
      <Form className="form">
        <Field component="input" type="text" name="name" placeholder="Name" className="form__text" />

        <Field component="input" type="email" name="email" placeholder="Email" className="form__text" />

        <Field component="input" type="text" name="password" placeholder="Password" className="form__text" />

        <div className="form__check">
          <label htmlFor="tos" className="form__check--label">
            Accept Terms of Service
          </label>
          <Field type="checkbox" name="tos" className="form__check--box" />
        </div>

        <button type="submit" className="form__btn">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  }
})(UserForm);
