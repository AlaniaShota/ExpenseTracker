import { doc, updateDoc } from "firebase/firestore";
import { useState, FormEvent } from "react";
import { db } from "./firebase";
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
interface EditFormProps {
  expenses: Expense;
  onUpdate: () => void;
  onCancel: () => void;
}

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
  const [amount, setAmount] = useState<number>(expenses.amount);
  const [category, setCategory] = useState<string>(expenses.category);
  const [comment, setComment] = useState<string>(expenses.comment);
  const [date, setDate] = useState<string>(
    new Date(expenses.date.seconds * 1000).toISOString().split("T")[0]
  );
  const [type, setType] = useState<string>(expenses.type);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const expenseRef = doc(db, "expenses", expenses.id);
      await updateDoc(expenseRef, {
        amount,
        category,
        date: new Date(date),
        comment,
        type,
      });
      onUpdate();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit} className="edit-form-content">
        <InputField
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
        <CustomSelect
          options={categoryOptions}
          onChange={(option) => setCategory(option ? option.value : "")}
          placeholder="Select Category"
          value={categoryOptions.find((option) => option.value === category)}
        />
        <InputField
          type="text"
          placeholder="Category"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <InputField
          type="date"
          value={date}
          placeholder="Date"
          onChange={(e) => setDate(e.target.value)}
          required
        />
        {/* <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select> */}
        <Button type="submit">Update</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditForm;
