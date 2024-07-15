import React from "react";
import { Expense } from "../../../Interface/Type";
import {
  IoIosHome,
  IoIosCar,
  IoLogoGameControllerB,
  IoIosBus,
} from "react-icons/io";
import { MdSportsHandball } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { CgUserAdd } from "react-icons/cg";
import { IoRestaurantSharp } from "react-icons/io5";
import "../style/index.scss";
import { Button } from "../../../components/Button";

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
  food: <IoRestaurantSharp />,
  housing: <IoIosHome />,
  transportation: <IoIosCar />,
  entertainment: <IoLogoGameControllerB />,
  clothing: <GiClothes />,
  health: <MdSportsHandball />,
  personal: <CgUserAdd />,
  others: <IoIosBus />,
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
    <>
      {expenses.length > 0 ? (
        <ul className="expense-list-content">
          {expenses.map((item) => {
            const icon = categoryIcons[item.category as Category] || (
              <CgUserAdd />
            );
            return (
              <li
                key={item.id}
                className="expense-list-detail expense-list hover-border-6"
              >
                <div className="">
                  {icon}
                  {item.category} - {item.amount} ({item.type})
                </div>
                {/* <div> */}
                <Button
                  type="button"
                  className="delete"
                  onClick={() => onEdit(item)}
                >
                  <span>Edit</span>
                </Button>
                <Button
                  type="button"
                  className="delete"
                  onClick={() => onDelete(item.id)}
                >
                  <span>Delete</span>
                </Button>
                {/* </div> */}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </>
  );
};

export default ExpenseList;
