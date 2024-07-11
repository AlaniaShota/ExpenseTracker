import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleImg from "../assets/google.png";
import "./style/SignInwithGoogle.scss";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/profile";
      }
    });
  }
  return (
    <>
      <p className="continue-p">--Or continue with--</p>
      <div
        // style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        className="google-img-section"
        onClick={googleLogin}
      >
        <img src={googleImg} />
      </div>
    </>
  );
}
export default SignInwithGoogle;
