import React from "react";
import { FaUser } from "react-icons/fa";
import "./style/MobileUserInterFace.scss";
import Logout from "./Logout";
import PDF from "./PDF";
const MobileUserInterFace = ({ user }) => {
  console.log(user);

  return (
    <div
      className="mobile-user-interface-content"
      //    onClick={openModal}
    >
      {user?.photoURL ? (
        <div className="mobile-user-avatar">
          <img
            src={user.photoURL}
            alt="User Avatar"
            // onClick={openModal}
          />
        </div>
      ) : (
        <div className="mobile-user-icon">
          <FaUser size={30} />
        </div>
      )}
      <div className="mobile-user-information">
        {/* <li> */}
        <h1 className="user-name ">
          {user.firstName} {user.lastName}
        </h1>
        <h4>{user.email}</h4>
        <h4>{user.phone}</h4>
        {/* </li> */}
      </div>

      
    </div>
  );
};

export default MobileUserInterFace;
