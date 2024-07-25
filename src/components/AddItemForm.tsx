import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import InputField from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { Button } from "./Button";

interface AddItemFormProps {
  title: string;
  categoryOptions: Array<{ value: string; label: React.ReactNode }>;
  onAddItem: () => void;
  type: "income" | "expense";
}

const AddItemForm: React.FC<AddItemFormProps> = ({
  title,
  categoryOptions,
  onAddItem,
  type,
}) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [date, setDate] = useState<string>("");

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
      onAddItem();
      setAmount(undefined);
      setCategory("");
      setComment("");
      setDate("");
      toast.success(`${type === "income" ? "Income" : "Expense"} is added`, {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="modal">
      <h2 className="modal-title">{title}</h2>
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
        <CustomSelect
          options={categoryOptions}
          onChange={(option) => setCategory(option ? option.value : "")}
          placeholder="Select Category"
          value={categoryOptions.find((option) => option.value === category)}
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
        <div className="btn-section">
          <Button className="submit-button" type="submit">
            <span>Add</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
