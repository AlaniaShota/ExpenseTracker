import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import InputField from "../../../components/CustomInput";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../context/AuthProvider";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const EmailUpdate = () => {
  const { updateUserEmail } = useAuth();

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
    <form onSubmit={formik.handleSubmit} className="update-form">
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
      <Button className="btn-setting" type="submit">
        <span>Save Email</span>
      </Button>
    </form>
  );
};

export default EmailUpdate;
