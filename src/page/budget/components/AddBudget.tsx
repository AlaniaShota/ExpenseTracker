import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  MdOutlineAttachMoney,
  MdHome,
  MdHealthAndSafety,
  MdHouse,
  MdOutlineRestaurant,
  MdSportsHandball,
} from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { CgUserAdd } from "react-icons/cg";
import Select from "react-select";
import { auth, db } from "../../../components/firebase";
import InputField from "../../../components/CustomInput";
import { Button } from "../../../components/Button";
import { toast } from "react-toastify";
import { StylesConfig, GroupBase } from "react-select";
import { IoMdTrendingUp } from "react-icons/io";
import { SiFreelancer } from "react-icons/si";
interface InputProps {
  fetchExpenses?: () => void;
  onAddExpense: () => void;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const options = [
  {
    value: "salary",
    label: (
      <div className='option'>
        <MdOutlineAttachMoney size={30} /> Salary
      </div>
    ),
  },
  {
    value: "rent",
    label: (
      <div className='option'>
        <MdHome size={30} /> Rent
      </div>
    ),
  },
  {
    value: "bonuses",
    label: (
      <div className='option'>
        <IoMdTrendingUp size={30} /> Bonuses
      </div>
    ),
  },
  {
    value: "freelance",
    label: (
      <div className='option'>
        <SiFreelancer size={30} /> Freelance
      </div>
    ),
  },
];

const customStyles: StylesConfig<any, false, GroupBase<any>> = {
  control: (provided) => ({
    ...provided,
    color: "black",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "blue" : "white",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const AddBudget: React.FC<InputProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("expense");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!auth.currentUser) {
        throw new Error("User not authenticated");
      }

      const docRef = await addDoc(collection(db, "expenses"), {
        amount: amount,
        category,
        comment,
        date: new Date(date),
        type: "income",
        userId: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      onAddExpense();
      setAmount(undefined);
      setCategory("");
      setComment("");
      setDate("");
      setType("income");
      toast.success("Expense is added", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="modal">
      <h2 className="modal-title">Add Expense</h2>
      <form className="modal-form-add-card-section" onSubmit={handleSubmit}>
        <InputField
          type="number"
          placeholder="Amount"
          value={amount === undefined ? "" : amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(parseFloat(e.target.value))
          }
          required
        />
        <Select
          options={options}
          onChange={(option) => setCategory(option ? option.value : "")}
          placeholder="Select Category"
          styles={customStyles}
        />
        <InputField
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
        />
        <InputField
          placeholder="Date"
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          required
        />
        <Button type="submit">
          <span>Add</span>
        </Button>
      </form>
    </div>
  );
};

export default AddBudget;
