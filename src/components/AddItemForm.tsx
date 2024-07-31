import React from "react";
// import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import InputField from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { Button } from "./Button";
import * as yup from "yup";
import { useFormik } from "formik";
import "./style/AddItemForm.scss";

interface AddItemFormProps {
  title: string;
  categoryOptions: Array<{ value: string; label: React.ReactNode }>;
  onAddItem: () => void;
  type: "income" | "expense";
}

const validationSchema = yup.object({
  amount: yup
    .number()
    .required("Amount is required")
    .typeError("Amount must be a number"),
  category: yup.string().required("Category is required"),
  comment: yup.string().notRequired(),
  date: yup.date().required("Date is required").typeError("Invalid date"),
});

const AddItemForm: React.FC<AddItemFormProps> = ({
  title,
  categoryOptions,
  onAddItem,
  type,
}) => {
  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      comment: "",
      date: "",
    },
    validationSchema,
    onSubmit: async ({ resetForm }) => {
      try {
        if (!auth.currentUser) {
          throw new Error("User not authenticated");
        }

        // const docRef = await addDoc(collection(db, "expenses"), {
        //   amount: parseFloat(values.amount),
        //   category: values.category,
        //   comment: values.comment,
        //   date: new Date(values.date),
        //   type,
        //   userId: auth.currentUser.uid,
        // });
        onAddItem();
        resetForm();
        toast.success(`${type === "income" ? "Income" : "Expense"} is added`, {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error(`Error adding document: ${error}`, {
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <div className="modal">
      <h2 className="modal-title">{title}</h2>
      <form
        className="modal-form-add-card-section"
        onSubmit={formik.handleSubmit}
      >
        <InputField
          type="number"
          placeholder="Amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.amount && formik.errors.amount
              ? formik.errors.amount
              : undefined
          }
          required
        />
        <CustomSelect
          options={categoryOptions}
          onChange={(option) =>
            formik.setFieldValue("category", option ? option.value : "")
          }
          placeholder="Select Category"
          value={categoryOptions.find(
            (option) => option.value === formik.values.category,
          )}
        />
        <InputField
          type="text"
          placeholder="Comment"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.comment && formik.errors.comment
              ? formik.errors.comment
              : undefined
          }
        />
        <InputField
          placeholder="Date"
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.date && formik.errors.date
              ? formik.errors.date
              : undefined
          }
          required
        />
        <div className="btn-section">
          <Button className="submit-button" type="submit">
            <span>Add</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
