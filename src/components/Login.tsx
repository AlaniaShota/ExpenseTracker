import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";

import "./style/Login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
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
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="btn">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <p className="register-link">
            <a href="/register">Create new account</a>
          </p>
        </div>

        {/* <div className="singin-with-google-content">
          <SignInwithGoogle />
        </div> */}
      </form>
    </div>
  );
};

export default Login;
