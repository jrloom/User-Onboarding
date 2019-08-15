import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ touched, errors, status, values }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="container">
      <Form className="form">
        <Field component="input" type="text" name="name" placeholder="Name" className="form__text" />
        {touched.name && errors.name && <p className="form__error">{errors.name}</p>}

        <Field component="input" type="email" name="email" placeholder="Email" className="form__text" />
        {touched.email && errors.email && <p className="form__error">{errors.email}</p>}

        <Field component="input" type="text" name="password" placeholder="Password" className="form__text" />

        <div className="form__check">
          <label htmlFor="tos" className="form__check--label">
            Accept Terms of Service
          </label>
          <Field type="checkbox" name="tos" checked={values.tos} className="form__check--box" />
        </div>

        <button type="submit" className="form__btn">
          Submit
        </button>
      </Form>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
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
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("So...what should we call you?")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(resolve => {
        setStatus(resolve.data);
        resetForm();
      })
      .catch(error => console.log(error));
  }
})(UserForm);
