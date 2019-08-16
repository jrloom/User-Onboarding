import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ touched, errors, status, values }) => {
  const [users, setUsers] = useState([]);

  const role = [
    {
      id: 0,
      role: "Select a Role"
    },
    {
      id: 1,
      role: 'Mouseketeer'
    },
    {
      id: 2,
      role: "Keeper"
    },
    {
      id: 3,
      role: "Landlubber"
    }
  ]

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="container">
      <div className="container-signup">
        <Form className="form">
          <Field component="input" type="text" name="name" placeholder="Name" className="form__text" />
          {touched.name &&
            errors.name &&
            <p className="form__error">{errors.name}</p>}

          <Field component="input" type="text" name="email" placeholder="Email" className="form__text" />
          {touched.email &&
            errors.email &&
            <p className="form__error">{errors.email}</p>}

          <Field component="input" type="text" name="password" placeholder="Password" className="form__text" />
          {touched.password &&
            errors.password &&
            <p className="form__error">{errors.password}</p>}

          <Field component="input" type="text" name="age" placeholder="Age" className='form__text' />

          <Field component="select" name="role" placeholder="Select a Role" className="form__text">
            {role.map(role => {
              return (
                <option key={role.id}>{role.role}</option>
              )
            })}
          </Field>
          {touched.role &&
            errors.role &&
            <p className="form__error">{errors.role}</p>}

          <div className="form__check">
            <label htmlFor="tos" className="form__check--label">
              Accept Terms of Service
              {touched.tos &&
                errors.tos &&
                <p className="form__error">{errors.tos}</p>}
            </label>
            <Field type="checkbox" name="tos" checked={values.tos} className="form__check--box" />
          </div>

          <button type="submit" className="form__btn">
            Submit
          </button>
        </Form>
      </div>
      <div className="container-card">
        {users.map(user => (
          <div key={user.id} className="card">
            <p className="card__info">{user.name}</p>
            <p className="card__info">{user.email}</p>
            <p className="card__info">{user.role}</p>
            <p className="card__info">Thanks for signing up!</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues({ name, email, password, role, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup
      .string()
      .min(2, 'lol no')
      .max(50, "whoa")
      .required("So...what should we call you?"),
    email: Yup
      .string()
      .email('Your forgot something')
      .required('But how would we contact you?'),
    password: Yup
      .string()
      .required('You need to do this')
      .min(8, '8 character minimum'),
    role: Yup
      .boolean()
      .oneOf([true], 'You must choose'),
    tos: Yup
      .boolean()
      .oneOf([true], 'Just check the box')
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
