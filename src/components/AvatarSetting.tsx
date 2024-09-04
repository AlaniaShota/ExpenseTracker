import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import "./style/AvatarSetting.scss";
import InputField from "./CustomInput";
import { Button } from "./Button";
import { UPDATE } from "./constanta";

const AvatarSetting = () => {
  const { userDetails, updateUserAvatar } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleClickImg = async () => {
    if (avatar) {
      try {
        if (userDetails) {
          await updateUserAvatar(avatar);
          toast.success("Avatar is changed", {
            position: "bottom-right",
          });
        } else {
          toast.error("User details not found", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        toast.error(`Error updating document:${error}`, {
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
    <div className="avatar-modal">
      <InputField
        className="upload-button"
        type="file"
        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
      />
      <Button type="button" className="upload-button" onClick={handleClickImg}>
        <span>{UPDATE}</span>
      </Button>
    </div>
  );
};

export default AvatarSetting;
