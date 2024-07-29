import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context/AuthProvider";
import InputField from "./CustomInput";
import { toast } from "react-toastify";
import { Button } from "./Button";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const EmailUpdate = () => {
  const { updateUserEmail } = useAuth();
  const [showEmailField, setShowEmailField] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserEmail(values.email);
        toast.success("Email updated successfully!", {
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
    <form onSubmit={formik.handleSubmit}>
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
      <Button className="btn-logout btn-3 hover-border-5" type="submit">
        <span>Save Email</span>
      </Button>
    </form>
  );
};

export default EmailUpdate;
