import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import InputField from "./CustomInput";
import { Button } from "./Button";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "bottom-center",
        });
      } else {
        toast.error("An unknown error occurred", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className="form-content">
      <form onSubmit={handleRegister} className="form-section">
        <h3 className="login-title">Sign Up</h3>
        <InputField
          type="text"
          value={fname}
          placeholder="First name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFname(e.target.value)
          }
          required
        />
        <InputField
          type="text"
          value={lname}
          placeholder="Last name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLname(e.target.value)
          }
        />
        <InputField
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <InputField
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        <div className="login-btn">
          <Button type="submit" className="register-link">
            Sign Up
          </Button>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
