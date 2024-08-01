import { collection, addDoc } from "firebase/firestore";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Button } from "./Button";
import InputField from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase";

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
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      comment: "",
      date: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!user) {
          throw new Error("User not authenticated");
        }

        const newExpense = {
          userId: user.uid,
          amount: values.amount,
          category: values.category,
          comment: values.comment,
          date: values.date,
          type: type,
        };

        await addDoc(collection(db, "expenses"), newExpense);

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
            (option) => option.value === formik.values.category
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
