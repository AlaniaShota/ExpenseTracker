import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ConditionalRoute from "./route/routes";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import List from "./page/list/List";
import Analytics from "./page/analytics/Analytics";
import Budget from "./page/budget/Budget";
import { useAuth } from "./context/AuthProvider";

import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const { user } = useAuth();

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
        {
          path: "/analytic/budgets",
          element: <Budget />,
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
