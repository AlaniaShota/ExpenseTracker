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
import List from "./page/list/List";
import Analytics from "./page/analytics/Analytics";
import AddExpenses from "./page/list/component/AddExpenses";

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
      path: "/analytic",
      element: <Layout />,
      children: [
        {
          path: "/analytic",
          element: <Analytics />,
        },
        {
          path: "/analytic/list",
          element: <List />,
        },
        // { path: "/analytic/list/add", element: <AddExpenses /> },
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
