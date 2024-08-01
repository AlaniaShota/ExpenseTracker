import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  IoMdAnalytics,
  IoIosList,
  IoIosWallet,
} from "react-icons/io";
import "./style/Navigation.scss";
import { useAuth } from "../context/AuthProvider";
import PDF from "./PDF";
import AvatarSetting from "./AvatarSetting";
import Modal from "react-modal";
import Logout from "./Logout";

const links = [
  { id: 1, title: "Analytics", href: "/analytic", icon: IoMdAnalytics },
  { id: 2, title: "List", href: "/analytic/list", icon: IoIosList },
  { id: 3, title: "Budgets", href: "/analytic/budgets", icon: IoIosWallet },
];

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(152, 152, 152, 0.718)",
    zIndex: "100",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Navigation: React.FC = () => {
  const { userDetails } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="navigation">
      <div className="user-profile-section">
        <div className="user-img" onClick={openModal}>
          {userDetails?.photoURL ? (
            <div className="user-avatar">
              <img
                src={userDetails.photoURL}
                alt="User Avatar"
                onClick={openModal}
              />
            </div>
          ) : (
            <div className="user-icon">
              <FaUser size={30} />
            </div>
          )}
        </div>
        {userDetails && (
          <Link to="/analytic/setting" className="user-name-link">
            <h3 className="user-name">Hello {userDetails.firstName}</h3>
          </Link>
        )}
      </div>
      <div className="links-section">
        {links.map((item) => (
          <Link key={item.id} to={item.href} className="links-content">
            <item.icon size={30} />
            <h3 className="link-title">{item.title}</h3>
          </Link>
        ))}
        <PDF />
      </div>
      <Logout />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Avatar Settings"
        style={customStyles}
      >
        <AvatarSetting />
      </Modal>
    </div>
  );
};

export default Navigation;
