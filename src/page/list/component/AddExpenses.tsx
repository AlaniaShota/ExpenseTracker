import React from "react";
import { auth } from "../../../components/firebase";
import Card from "../../../components/Card";

interface AddExpensesProps {
  onAddExpense: () => void;
}

const AddExpenses: React.FC<AddExpensesProps> = ({ onAddExpense }) => {
  return <> {auth.currentUser && <Card onAddExpense={onAddExpense} />}</>;
};

export default AddExpenses;
