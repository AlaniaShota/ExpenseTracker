import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";

import "./style/Login.scss";
import InputField from "./CustomInput";
import { Link } from "react-router-dom";
import { Button } from "./Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/analytic";
      toast.success("User logged in Successfully", {
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
      <form onSubmit={handleSubmit} className="form-section">
        <h3 className="login-title">Login</h3>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-btn">
          <Button type="submit" className="submit-button">
            Submit
          </Button>
          <div>
            <Link to="/register">Create new account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
