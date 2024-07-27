import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const UserSetting = () => {
  const { userDetails, updateUserDetails, updateUserPassword } = useAuth();
  const [firstName, setFirstName] = useState(userDetails?.firstName || "");
  const [lastName, setLastName] = useState(userDetails?.lastName || "");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    try {
      await updateUserDetails(firstName, lastName);
      if (password) {
        await updateUserPassword(password);
      }
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* <div>
        <label>Avatar:</label>
        <input type="file" onChange={(e) => setAvatar(e.target.files?.[0])} />
        <button onClick={handleClickImg}>Testing IMG</button>
      </div> */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserSetting;
