import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SIgnUp";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home/Home";
import Contact from "../Pages/Contact/Contact";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Worksheet from "../Pages/Dashboard/Employee/WorkSheet/Worksheet";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import HrRoute from "./HrRoute";
import Employees from "../Pages/Dashboard/HR/Employees/Employees";
import PaymentHistory from "../Pages/Dashboard/Employee/PaymentHistory/PaymentHistory";
import Progress from "../Pages/Dashboard/HR/Progress/Progress";
import AllEmployeeList from "../Pages/Dashboard/Admin/AllEmployeeList";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "dashboard",
        errorElement: <Error />,
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                path: "worksheet",
                element: <Worksheet />,
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory />,
            },
            {
                path: "home",
                element: <UserHome />,
            },
            {
                path: "employeeList",
                element: (
                    <HrRoute>
                        <Employees />
                    </HrRoute>
                ),
            },
            {
                path: "progress",
                element: (
                    <HrRoute>
                        <Progress />
                    </HrRoute>
                ),
            },
            {
                path: "allEmployeeList",
                element: (
                    <AdminRoute>
                        <AllEmployeeList />,
                    </AdminRoute>
                ),
            },
        ],
    },
]);
