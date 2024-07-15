// import { AiOutlinePlus } from "react-icons/ai";

import "../style/AddCard.scss";
// import { Link } from "react-router-dom";

// interface AddCardProps {
//   onAddExpense: () => void;
// }

// const AddCard: React.FC<AddCardProps> = () => {
//   return (
//     <Link
//       to="/analytic/list/add"
//     //   onClick={onAddExpense}
//       className="expense-holder"
//     >
//       <button className="expense-card add expense hover-border-5">
//         <AiOutlinePlus color="#fff" size={30} />
//       </button>
//     </Link>
//   );
// };

// export default AddCard;
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
// import Select from "react-select";
import { IoRestaurantSharp } from "react-icons/io5";
import {
  IoIosHome,
  IoIosCar,
  IoLogoGameControllerB,
  IoIosBus,
} from "react-icons/io";
import { MdSportsHandball } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { CgUserAdd } from "react-icons/cg";
import Select from "react-select";
import { auth, db } from "../../../components/firebase";
import InputField from "../../../components/CustomInput";
import { Button } from "../../../components/Button";

interface InputProps {
  fetchExpenses: () => void;
  onAddExpense: () => void;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const categoryOptions = [
  {
    value: "food",
    label: (
      <div>
        <IoRestaurantSharp /> Food
      </div>
    ),
  },
  {
    value: "housing",
    label: (
      <div>
        <IoIosHome /> Housing
      </div>
    ),
  },
  {
    value: "transportation",
    label: (
      <div>
        <IoIosCar /> Transportation
      </div>
    ),
  },
  {
    value: "entertainment",
    label: (
      <div>
        <IoLogoGameControllerB /> Entertainment
      </div>
    ),
  },
  {
    value: "clothing",
    label: (
      <div>
        <GiClothes /> Clothing
      </div>
    ),
  },
  {
    value: "health",
    label: (
      <div>
        <MdSportsHandball /> Health
      </div>
    ),
  },
  {
    value: "personal",
    label: (
      <div>
        <CgUserAdd /> Personal
      </div>
    ),
  },
  {
    value: "others",
    label: (
      <div>
        <IoIosBus /> Others
      </div>
    ),
  },
];

const customStyles = {
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

const AddCard: React.FC<InputProps> = ({ onAddExpense }) => {
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
        type,
        userId: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      onAddExpense();
      setAmount(undefined);
      setCategory("");
      setComment("");
      setDate("");
      setType("expense");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="expense-list">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
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
          options={categoryOptions}
          onChange={(option) => setCategory(option ? option.value : "")}
          placeholder="Select Category"
          styles={customStyles}
        />
        <InputField
          type="text"
          placeholder="Comment"
          value={comment}
          // style={{ color: "black" }}
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
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <Button type="submit">
          <span>Add</span>
        </Button>
      </form>
    </div>
  );
};

export default AddCard;
