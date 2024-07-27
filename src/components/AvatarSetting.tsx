import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import "./style/AvatarSetting.scss";
import InputField from "./CustomInput";
import { Button } from "./Button";

const AvatarSetting = () => {
  const { userDetails, updateUserDetails } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleClickImg = async () => {
    if (avatar) {
      try {
        if (userDetails) {
          await updateUserDetails(
            userDetails.firstName,
            userDetails.lastName,
            avatar
          );
        } else {
          toast.error("User details not found", {
            position: "bottom-right",
          });
        }
        toast.success("Avatar is changed", {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error("Error uploading image", {
          position: "bottom-right",
        });
      }
    } else {
      toast.warn("No file selected", {
        position: "bottom-right",
      });
    }
  };

  return (
    // <div >
    <div className="avatar-modal">
      <InputField
        className="upload-button"
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
      />
      <Button type="button" className="upload-button" onClick={handleClickImg}>
        Upload
      </Button>
    </div>
    // </div>
  );
};

export default AvatarSetting;
