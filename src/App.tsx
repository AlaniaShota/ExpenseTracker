import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { auth } from "./components/firebase";
import ConditionalRoute from "./route/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ConditionalRoute user={user}>
          <Login />
        </ConditionalRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Layout />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
