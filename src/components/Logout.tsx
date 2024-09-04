import { Button } from "./Button";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { LOGOUT } from "./constanta";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      toast.error(`Error updating document:${error}`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <Button
      type="submit"
      logout={handleLogout}
      className="btn-logout btn-3 hover-border-5"
    >
      <div className="logout-icon">
        <IoIosLogOut size={35} color="white" />
        <span>{LOGOUT}</span>
      </div>
    </Button>
  );
};

export default Logout;
