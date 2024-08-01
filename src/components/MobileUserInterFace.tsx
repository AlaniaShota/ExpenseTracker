import { FaUser } from "react-icons/fa";
import "./style/MobileUserInterFace.scss";
import { UserDetails } from "../Interface/Type";

interface MobileUserInterFaceProps {
    userDetails: UserDetails;
  }

const MobileUserInterFace: React.FC<MobileUserInterFaceProps> = ({ userDetails }) => {
  return (
    <div
      className="mobile-user-interface-content"
      //    onClick={openModal}
    >
      {userDetails?.photoURL ? (
        <div className="mobile-user-avatar">
          <img
            src={userDetails.photoURL}
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
          {userDetails.firstName} {userDetails.lastName}
        </h1>
        <h4>{userDetails.email}</h4>
        <h4>{userDetails.phone}</h4>
        {/* </li> */}
      </div>
    </div>
  );
};

export default MobileUserInterFace;
