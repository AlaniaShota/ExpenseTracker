
import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./route/Routes";
import reportWebVitals from "./reportWebVitals";

const App: React.FC = () => {
  const router = Routes();

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
reportWebVitals();
