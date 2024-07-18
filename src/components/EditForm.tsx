import { doc, updateDoc } from "firebase/firestore";
import { useState, FormEvent } from "react";
import { db } from "./firebase";
import { Expense } from "../Interface/Type";
import InputField from "./CustomInput";
import { Button } from "./Button";
import { toast } from "react-toastify";

interface EditFormProps {
  expenses: Expense;
  onUpdate: () => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
  expenses,
  onUpdate,
  onCancel,
}) => {
  const [amount, setAmount] = useState<number>(expenses.amount);
  const [category, setCategory] = useState<string>(expenses.category);
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
        type,
      });
      onUpdate();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="expense-form">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
        <InputField
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <InputField
          type="date"
          value={date}
          placeholder="Date"
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <Button type="submit">Update</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditForm;
