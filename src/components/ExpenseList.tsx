import { Expense } from "../Interface/Type";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

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
    <div className="expense-list">
      <h2>Your Expenses</h2>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {new Date(expense.date.seconds * 1000).toDateString()} -{" "}
              {expense.category} - {expense.amount} ({expense.type})
              <button onClick={() => onEdit(expense)}>Edit</button>
              <button onClick={() => onDelete(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
