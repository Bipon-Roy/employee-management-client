import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";

import { GrWorkshop } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import Sidebar from "./Sidebar";
import useHR from "../hook/useHR";
import useAdmin from "../hook/useAdmin";

const Dashboard = () => {
    const [isHR] = useHR();
    const [isAdmin] = useAdmin();

    const links = (
        <>
            {isAdmin && (
                <>
                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/home"
                        >
                            User Home
                            <FaHome />
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/allEmployeeList"
                        >
                            All Employee List
                            <BsPeopleFill />
                        </NavLink>
                    </li>
                </>
            )}
            {/*For HR */}
            {isHR && (
                <>
                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/home"
                        >
                            User Home
                            <FaHome />
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/employeeList"
                        >
                            Employee List
                            <BsPeopleFill />
                        </NavLink>
                    </li>

                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/progress"
                        >
                            Progress
                            <GiProgression />
                        </NavLink>
                    </li>
                </>
            )}

            {/*For Employee */}
            {!isAdmin && !isHR && (
                <>
                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/home"
                        >
                            User Home
                            <FaHome />
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/paymentHistory"
                        >
                            Payment History
                            <MdOutlinePayment />
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink
                            className="flex items-center justify-between gap-2"
                            to="/dashboard/workSheet"
                        >
                            Work Sheet
                            <GrWorkshop />
                        </NavLink>
                    </li>
                </>
            )}
            {/*Shared nav links*/}

            <li>
                <NavLink className="flex items-center gap-2" to="/">
                    Home
                    <FaHome />
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="hidden lg:block lg:w-72 min-h-screen bg-mainBg">
                <ul className="menu px-6 py-10 space-y-5 font-medium text-mainText">{links}</ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1">
                <Sidebar links={links} />
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
