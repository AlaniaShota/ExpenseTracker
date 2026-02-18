import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import "../style/UserSetting.scss";
import { useAuth } from "../../../context/AuthProvider";
import { useMobile } from "../../../context/Mobile";
import MobileUserInterFace from "./MobileUserInterFace";
import Logout from "../../../components/Logout";
import PDF from "../PDF";
import { Button } from "../../../components/Button";
import InputField from "../../../components/CustomInput";
import PasswordSetting from "./PasswordSetting";
import EmailUpdate from "./EmailUpdate";
import PhoneUpdate from "./PhoneUpdate";
import { uiText } from "../../../mocksData/uiText";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "First name must contain only letters")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
    .required("Last name is required"),
});

const UserDetailsSetting = () => {
  const { userDetails, updateUserDetails } = useAuth();
  const [showFullNameField, setShowFullNameField] = useState(false);
  const [showPasswordSetting, setShowPasswordSetting] = useState(false);
  const [showEmailUpdate, setShowEmailUpdate] = useState(false);
  const [showPhoneUpdate, setShowPhoneUpdate] = useState(false);
  const isMobile = useMobile();

  const formik = useFormik({
    initialValues: {
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserDetails(values.firstName, values.lastName);
        toast.success("Profile updated successfully!", {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error("Error updating profile", {
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <div className="user-details-setting">
      <h2 className="page-title">{uiText.user.title}</h2>
      {isMobile && userDetails && (
        <MobileUserInterFace userDetails={userDetails} />
      )}
      {isMobile && (
        <div className="mobile-logout">
          <Logout />
          <PDF />
        </div>
      )}
      <div className="setting-sections">
        <div className="setting-section">
          <Button
            className="btn-setting"
            type="button"
            onClick={() => setShowFullNameField((prev) => !prev)}
          >
            <span>
              {showFullNameField ? `${uiText.user.hide} ${uiText.auth.name} ${uiText.user.update}`: `${uiText.user.update} ${uiText.auth.name}`}
            </span>
          </Button>
          {showFullNameField && (
            <form onSubmit={formik.handleSubmit} className="update-form">
              <InputField
                type="text"
                name="firstName"
                value={formik.values.firstName}
                placeholder="First name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : undefined
                }
              />
              <InputField
                type="text"
                name="lastName"
                value={formik.values.lastName}
                placeholder="Last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : undefined
                }
              />
              <Button className="btn-setting" type="submit">
                <span>{uiText.budget.save} {uiText.auth.name}</span>
              </Button>
            </form>
          )}
        </div>
        <div className="setting-section">
          <Button
            className="btn-setting"
            type="button"
            onClick={() => setShowPasswordSetting((prev) => !prev)}
          >
            <span>
              {showPasswordSetting ? `${uiText.user.hide} ${uiText.auth.password} ${uiText.user.update}`: `${uiText.user.update} ${uiText.auth.password}`}
            </span>
          </Button>
          {showPasswordSetting && <PasswordSetting />}
        </div>
        <div className="setting-section">
          <Button
            className="btn-setting"
            type="button"
            onClick={() => setShowEmailUpdate((prev) => !prev)}
          >
            <span>
              {showEmailUpdate ? `${uiText.user.hide} ${uiText.auth.email} ${uiText.user.update}`: `${uiText.user.update} ${uiText.auth.email}`}
            </span>
          </Button>
          {showEmailUpdate && <EmailUpdate />}
        </div>
        <div className="setting-section">
          <Button
            className="btn-setting"
            type="button"
            onClick={() => setShowPhoneUpdate((prev) => !prev)}
          >
            <span>
              {showPhoneUpdate ? `${uiText.user.hide} ${uiText.auth.phone} ${uiText.user.update}`: `${uiText.user.update} ${uiText.auth.phone}`}
            </span>
          </Button>
          {showPhoneUpdate && <PhoneUpdate />}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSetting;
