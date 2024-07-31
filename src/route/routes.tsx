// src/route/Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Layout from "../components/Layout";
import Analytics from "../page/analytics/Analytics";
import List from "../page/list/List";
import Budget from "../page/budget/Budget";
import ConditionalRoute from "./ConditionalRoute";
import UserSetting from "../components/UserSetting";

const Routes = () => {
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
          element: <UserSetting />,
        },
      ],
    },
  ]);
};

export default Routes;
