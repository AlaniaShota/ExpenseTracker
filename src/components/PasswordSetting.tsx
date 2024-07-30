import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import InputField from "./CustomInput";
import { Button } from "./Button";

const validationSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordSetting = () => {
  const { updateUserPassword } = useAuth();
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserPassword(values.password, values.currentPassword);
        toast.success("Password updated successfully!", {
          position: "bottom-right",
        });
        formik.resetForm();
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        toast.error(`Error updating password: ${errorMessage}`, {
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}  className="update-form" >
      <InputField
        type="password"
        name="currentPassword"
        value={formik.values.currentPassword || ""}
        placeholder="Current Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.currentPassword && formik.errors.currentPassword
            ? formik.errors.currentPassword
            : undefined
        }
      />
      <InputField
        type="password"
        name="password"
        value={formik.values.password || ""}
        placeholder="New Password"
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
        value={formik.values.confirmPassword || ""}
        placeholder="Confirm New Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : undefined
        }
      />
      <Button className="btn-logout btn-3 hover-border-5" type="submit">
        <span>Save Password</span>
      </Button>
    </form>
  );
};

export default PasswordSetting;
