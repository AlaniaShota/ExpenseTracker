import React from "react";
import { MdOutlineAttachMoney, MdHome } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";
import { SiFreelancer } from "react-icons/si";
import AddItemForm from "../../../components/AddItemForm";

const categoryOptions = [
  {
    value: "salary",
    label: (
      <div className="option">
        <MdOutlineAttachMoney size={30} /> Salary
      </div>
    ),
  },
  {
    value: "rent",
    label: (
      <div className="option">
        <MdHome size={30} /> Rent
      </div>
    ),
  },
  {
    value: "bonuses",
    label: (
      <div className="option">
        <IoMdTrendingUp size={30} /> Bonuses
      </div>
    ),
  },
  {
    value: "freelance",
    label: (
      <div className="option">
        <SiFreelancer size={30} /> Freelance
      </div>
    ),
  },
];

const AddBudget: React.FC<{ onAddExpense: () => void }> = ({
  onAddExpense,
}) => (
  <AddItemForm
    title="Add Income"
    categoryOptions={categoryOptions}
    onAddItem={onAddExpense}
    type="income"
  />
);

export default AddBudget;
