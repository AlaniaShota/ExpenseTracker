import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "./firebase";

interface CardProps {
  onAddExpense: () => void;
}

const Card: React.FC<CardProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string>("");
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
        date: new Date(date),
        type,
        userId: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      onAddExpense();
      setAmount(undefined);
      setCategory("");
      setDate("");
      setType("expense");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount === undefined ? "" : amount}
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Card;
