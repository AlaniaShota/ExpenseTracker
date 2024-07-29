import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context/AuthProvider";
import InputField from "./CustomInput";
import { toast } from "react-toastify";
import { Button } from "./Button";

const validationSchema = yup.object({
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
});

const PhoneUpdate = () => {
  const { updateUserPhone } = useAuth();
  const [showPhoneField, setShowPhoneField] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserPhone(values.phone);
        toast.success("Phone number updated successfully!", {
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
        type="text"
        name="phone"
        value={formik.values.phone}
        placeholder="Phone number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : undefined
        }
      />

      <Button className="btn-logout btn-3 hover-border-5" type="submit">
        <span>Save Phone</span>
      </Button>
    </form>
  );
};

export default PhoneUpdate;
