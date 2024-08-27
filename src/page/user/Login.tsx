import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./style/Login.scss";
import { auth } from "../../firebase";
import InputField from "../../components/CustomInput";
import { Button } from "../../components/Button";
import {  CREATE, LOGIN, SUBMIT } from "./constanta";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        window.location.href = "/analytic";
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message, {
            position: "bottom-center",
          });
        } else {
          toast.error("An unknown error occurred", {
            position: "bottom-center",
          });
        }
      }
    },
  });

  return (
    <div className="form-content">
      <form onSubmit={formik.handleSubmit} className="form-section">
        <h3 className="login-title">{LOGIN}</h3>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <div className="login-btn">
          <Button type="submit" className="submit-button">
            {SUBMIT}
          </Button>
          <div>
            <Link to="/register">{CREATE}</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
