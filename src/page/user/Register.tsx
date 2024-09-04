import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import InputField from "../../components/CustomInput";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { LOGIN, PAGE_TITLE } from "./constanta";
import loginImg from '../../assets/education-expenses-college-education-pricing.jpg'
import './style/Login.scss'

const validationSchema = yup.object({
  fname: yup
    .string()
    .matches(/^[A-Za-z]+$/, "First name must contain only letters")
    .required("First name is required"),
  lname: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, "Phone number must be digits")
    .notRequired(),
});

const Register: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );
        const user = userCredential.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: values.fname,
            lastName: values.lname,
            phone: values.phone,
            photo: "",
          });
        }
        toast.success("User Registered Successfully!!", {
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
    <div className="login"><div className="form-content">
    <form onSubmit={formik.handleSubmit} className="form-section">
      <h3 className="login-title">{PAGE_TITLE}</h3>
      <div className="login-input">
      <InputField
        type="text"
        name="fname"
        value={formik.values.fname}
        placeholder="First name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.fname && formik.errors.fname
            ? formik.errors.fname
            : undefined
        }
      />
      <InputField
        type="text"
        name="lname"
        value={formik.values.lname}
        placeholder="Last name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.lname && formik.errors.lname
            ? formik.errors.lname
            : undefined
        }
      />
      <InputField
        type="email"
        name="email"
        value={formik.values.email}
        placeholder="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : undefined
        }
      />
      <InputField
        type="password"
        name="password"
        value={formik.values.password}
        placeholder="Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : undefined
        }
      />
      <InputField
        type="password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        placeholder="Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : undefined
        }
      />
      <InputField
        type="text"
        name="phone"
        value={formik.values.phone}
        placeholder="Phone number (optional)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : undefined
        }
      />
      </div>
      <div className="login-btn">
        {/* <Button type="submit" className="register-link">
          Sign Up
        </Button> */}
        <div>
          <Link to="/login">{LOGIN}</Link>
        </div>
      </div>
    </form>
  </div>
   <div className="login-img">
   <img src={loginImg} alt="Login" />
 </div></div>
  );
};
export default Register;
