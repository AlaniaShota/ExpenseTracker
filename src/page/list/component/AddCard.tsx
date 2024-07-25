import React from "react";
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
import AddItemForm from "../../../components/AddItemForm";

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

const AddCard: React.FC<{ onAddExpense: () => void }> = ({ onAddExpense }) => {
  return (
    <AddItemForm
      title="Add Expense"
      categoryOptions={categoryOptions}
      onAddItem={onAddExpense}
      type="expense"
    />
  );
};

export default AddCard;
