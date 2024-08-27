
import { createBrowserRouter } from "react-router-dom";
import Register from "../page/user/Register";
import Layout from "../components/Layout";
import Analytics from "../page/analytics/Analytics";
import List from "../page/list/List";
import ConditionalRoute from "./ConditionalRoute";
import Budget from "../page/budget/Budget";
import Login from "../page/user/Login";
import UserDetailsSetting from "../page/user/components/UserSetting";

const Route = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <ConditionalRoute>
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
        {
          path: "/analytic/setting",
          element: <UserDetailsSetting />,
        },
      ],
    },
  ]);
};

export default Route;
