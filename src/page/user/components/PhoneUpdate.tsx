import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import InputField from "../../../components/CustomInput";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../context/AuthProvider";

const validationSchema = yup.object({
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
});

const PhoneUpdate = () => {
  const { updateUserPhone } = useAuth();

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
    <form className="update-form" onSubmit={formik.handleSubmit}>
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

      <Button className="btn-setting" type="submit">
        <span>Save Phone</span>
      </Button>
    </form>
  );
};

export default PhoneUpdate;
