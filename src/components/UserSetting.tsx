import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context/AuthProvider";
import InputField from "./CustomInput";
import { Button } from "./Button";
import { toast } from "react-toastify";
import PasswordSetting from "./PasswordSetting";
import EmailUpdate from "./EmailUpdate";
import PhoneUpdate from "./PhoneUpdate";
import { useState } from "react";
import "./style/UserSetting.scss";
import { useMobile } from "../context/Mobile";
import MobileUserInterFace from "./MobileUserInterFace";
import Logout from "./Logout";
import PDF from "./PDF";

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
      <h2 className="page-title">User Details</h2>
      {isMobile && <MobileUserInterFace user={userDetails} />}
      <div className="setting-sections">
        <div className="section">
          <Button
            className="btn-logout btn-3 hover-border-5"
            type="button"
            onClick={() => setShowFullNameField((prev) => !prev)}
          >
            <span>
              {showFullNameField ? "Hide Name Update" : "Update Name"}
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
              <Button className="btn-logout btn-3 hover-border-5" type="submit">
                <span>Save Name</span>
              </Button>
            </form>
          )}
        </div>
        <div className="section">
          <Button
            className="btn-logout btn-3 hover-border-5"
            type="button"
            onClick={() => setShowPasswordSetting((prev) => !prev)}
          >
            <span>
              {showPasswordSetting ? "Hide Password Update" : "Update Password"}
            </span>
          </Button>
          {showPasswordSetting && <PasswordSetting />}
        </div>
        <div className="section">
          <Button
            className="btn-logout btn-3 hover-border-5"
            type="button"
            onClick={() => setShowEmailUpdate((prev) => !prev)}
          >
            <span>
              {showEmailUpdate ? "Hide Email Update" : "Update Email"}
            </span>
          </Button>
          {showEmailUpdate && <EmailUpdate />}
        </div>
        <div className="section">
          <Button
            className="btn-logout btn-3 hover-border-5"
            type="button"
            onClick={() => setShowPhoneUpdate((prev) => !prev)}
          >
            <span>
              {showPhoneUpdate ? "Hide Phone Update" : "Update Phone"}
            </span>
          </Button>
          {showPhoneUpdate && <PhoneUpdate />}
        </div>
      </div>
      <div className="mobile-logout">
        <Logout />
        <PDF />
      </div>
    </div>
  );
};

export default UserDetailsSetting;
