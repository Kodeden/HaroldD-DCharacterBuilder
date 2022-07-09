import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      if (
        values.email.toLocaleLowerCase() === "fakeemail@fake.com" &&
        values.password === "fakeemail@fake.com"
      ) {
        setAuth({ isAuthenticated: true });
        navigate("/race");
      } else {
        alert("Invalid email or password");
      }
    },
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <label className="label-spacing" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          className="input-spacing"
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label className="label-spacing" htmlFor="password">
          Pasword
        </label>
        <input
          id="password"
          type="password"
          className="input-spacing"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button disabled={!formik.isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
