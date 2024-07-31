import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Expense } from "../Interface/Type";
import InputField from "./CustomInput";
import { Button } from "./Button";
import "./style/EditForm.scss";
import {
  MdDevicesOther,
  MdEmojiTransportation,
  MdHealthAndSafety,
  MdHouse,
  MdOutlineRestaurant,
  MdSportsHandball,
} from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { CgUserAdd } from "react-icons/cg";
import CustomSelect from "./CustomSelect";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
interface EditFormProps {
  expenses: Expense;
  onUpdate: () => void;
  onCancel: () => void;
}
const validationSchema = yup.object({
  amount: yup
    .number()
    .required("Amount is required")
    .typeError("Amount must be a number")
    .positive("Amount must be positive"),
  category: yup.string().required("Category is required"),
  comment: yup.string().required("Comment is required"),
  date: yup.date().required("Date is required").typeError("Invalid date"),
});

const categoryOptions = [
  {
    value: "food",
    label: (
      <div className="option">
        <MdOutlineRestaurant size={30} /> Food
      </div>
    ),
  },
  {
    value: "housing",
    label: (
      <div className="option">
        <MdHouse size={30} /> Housing
      </div>
    ),
  },
  {
    value: "transportation",
    label: (
      <div className="option">
        <MdEmojiTransportation size={30} /> Transportation
      </div>
    ),
  },
  {
    value: "entertainment",
    label: (
      <div className="option">
        <MdSportsHandball size={30} /> Entertainment
      </div>
    ),
  },
  {
    value: "clothing",
    label: (
      <div className="option">
        <GiClothes size={30} /> Clothing
      </div>
    ),
  },
  {
    value: "health",
    label: (
      <div className="option">
        <MdHealthAndSafety size={30} /> Health
      </div>
    ),
  },
  {
    value: "personal",
    label: (
      <div className="option">
        <CgUserAdd size={30} /> Personal
      </div>
    ),
  },
  {
    value: "others",
    label: (
      <div className="option">
        <MdDevicesOther size={30} /> Others
      </div>
    ),
  },
];

const EditForm: React.FC<EditFormProps> = ({
  expenses,
  onUpdate,
  onCancel,
}) => {
  const formik = useFormik({
    initialValues: {
      amount: expenses.amount.toString(),
      category: expenses.category,
      comment: expenses.comment,
      date: new Date(expenses.date.seconds * 1000).toISOString().split("T")[0],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const expenseRef = doc(db, "expenses", expenses.id);
        await updateDoc(expenseRef, {
          amount: parseFloat(values.amount),
          category: values.category,
          comment: values.comment,
          date: new Date(values.date),
          type: expenses.type,
        });
        onUpdate();
      } catch (error) {
        toast.error(`Error updating document:${error}`, {
          position: "bottom-right",
        });
      }
    },
  });

  const getErrorMessage = (field: string) => {
    const error = formik.errors[field as keyof typeof formik.errors];
    return typeof error === "string" ? error : undefined;
  };

  return (
    <div className="edit-form">
      <h2 className="page-title">Edit Expense</h2>
      <form onSubmit={formik.handleSubmit} className="edit-form-content">
        <InputField
          type="number"
          name="amount"
          placeholder="Amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount ? getErrorMessage("amount") : undefined}
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
          name="comment"
          placeholder="Comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.comment ? getErrorMessage("comment") : undefined
          }
        />
        <InputField
          type="date"
          name="date"
          value={formik.values.date}
          placeholder="Date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date ? getErrorMessage("date") : undefined}
        />
        <div className="btn-section">
          <Button
            type="submit"
            className="btn-logout btn-update btn-3 hover-border-5"
          >
            <span> Update</span>
          </Button>
          <Button
            type="button"
            className="btn-logout btn-update btn-3 hover-border-5"
            onClick={onCancel}
          >
            <span> Cancel</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
