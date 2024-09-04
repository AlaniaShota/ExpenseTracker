import React from "react";
import { Expense } from "../Interface/Type";
import {
  MdSportsHandball,
  MdRestoreFromTrash,
  MdModeEdit,
  MdOutlineRestaurant,
  MdHouse,
  MdEmojiTransportation,
  MdHealthAndSafety,
  MdDevicesOther,
} from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { CgUserAdd } from "react-icons/cg";
import "./style/ExpenseList.scss";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

type Category =
  | "food"
  | "housing"
  | "transportation"
  | "entertainment"
  | "clothing"
  | "health"
  | "personal"
  | "others";

const categoryIcons: Record<Category, JSX.Element> = {
  food: <MdOutlineRestaurant color="#000" size={35} />,
  housing: <MdHouse color="#000" size={35} />,
  transportation: <MdEmojiTransportation color="#000" size={35} />,
  entertainment: <MdSportsHandball color="#000" size={35} />,
  clothing: <GiClothes color="#000" size={45} />,
  health: <MdHealthAndSafety color="#000" size={35} />,
  personal: <CgUserAdd color="#000" size={35} />,
  others: <MdDevicesOther color="#000" size={35} />,
};

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  loading,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <p>Loading expenses...</p>;
  }

  return (
    <table className="expense-list-content">
      <tbody>
        {expenses.map((item) => {
          const icon = categoryIcons[item.category as Category] || (
            <CgUserAdd color="#000" size={40} />
          );
          return (
            <tr
              key={item.id}
              className="expense-list-detail expense-list hover-border-5"
            >
              <td className="card-detail-icon">{icon}</td>
              <td
                className={`important-expense-comment ${
                  item.type === "income" ? "income" : ""
                }`}
              >
                <h3>{item.comment}</h3>
              </td>
              <td
                className={`important-expense-amount ${
                  item.type === "income" ? "income" : ""
                }`}
              >
                <h3>{item.amount}</h3>
              </td>
              <td className="card-edit-btn">
                <MdModeEdit size={35} onClick={() => onEdit(item)} />
                <MdRestoreFromTrash
                  size={35}
                  onClick={() => onDelete(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ExpenseList;
