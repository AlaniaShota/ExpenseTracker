import { AiOutlinePlus } from "react-icons/ai";

import "../style/AddCard.scss";
import { Link } from "react-router-dom";

interface AddCardProps {
  onAddExpense: () => void;
}

const AddCard: React.FC<AddCardProps> = () => {
  return (
    <Link
      to="/analytic/list/add"
    //   onClick={onAddExpense}
      className="expense-holder"
    >
      <button className="expense-card add expense hover-border-5">
        <AiOutlinePlus color="#fff" size={30} />
      </button>
    </Link>
  );
};

export default AddCard;
