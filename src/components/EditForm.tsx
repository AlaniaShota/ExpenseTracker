import { doc, updateDoc } from "firebase/firestore";
import { useState,  FormEvent } from "react"; // Import ChangeEvent and FormEvent
import { db } from "./firebase";
import { Expense } from "../Interface/Type";

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
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
