import { AiOutlinePlus } from "react-icons/ai";
import './style/AddBanner.scss'

interface AddBannerProps {
  open: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBanner: React.FC<AddBannerProps> = ({ open }) => (
  <div className="expense-add-content">
    <button
      onClick={() => open(true)}
      className="expense-add"
    >
      <AiOutlinePlus color="#000000" size={30} />
    </button>
  </div>
);

export default AddBanner;
