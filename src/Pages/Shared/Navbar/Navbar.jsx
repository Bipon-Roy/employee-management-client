import { Link, NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import logo from "../../../assets/logo.png";
const Navbar = () => {
    const links = (
        <>
            <li className="mr-5 font-medium">
                <NavLink to="/">Home</NavLink>
            </li>
            <li className="mr-5 font-medium">
                <NavLink to="/about">Contact Us</NavLink>
            </li>

            {/* {user && (
                <>
                    <li className="mr-5 font-medium">
                        <NavLink to="/myBookings">My Bookings</NavLink>
                    </li>
                </>
            )} */}
        </>
    );
    return (
        <>
            <nav className="navbar max-w-7xl mx-auto pr-6 lg:px-0 lg:py-0 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost p-1 lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 25 25"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white  rounded-box w-52"
                        >
                            {links}
                        </ul>
                    </div>
                    <div className="flex gap-1 items-center py-1">
                        <img src={logo} className="h-10 md:h-13 lg:h-[70px] p-1" alt="NavLogo" />
                        <p className="text-lg text-primary font-medium">Employee Management</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" menu-horizontal font-normal px-1 font">{links}</ul>
                </div>
                <div className="navbar-end">
                    {/* <div className="w-8 md:w-10 mr-2  md:mr-5">
                        {user && (
                            <img
                                className="rounded-full"
                                src={user.photoURL}
                                alt={user.displayName}
                            />
                        )}
                    </div> */}
                    <div>
                        <Link
                            to="/login"
                            className=" flex items-center gap-1 text-secondary font-bold"
                        >
                            Login
                            <BiLogInCircle className="text-lg" />
                        </Link>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <p className="text-xs md:text-base font-bold">Bipon</p>
                                <button
                                    className="md:px-3 md:py-2 rounded-md font-bold text-xs  md:text-base text-red-500"
                                    // onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* {user ? (
                        <div className="flex items-center gap-3">
                            <p className="text-xs md:text-base font-bold">{user.displayName}</p>

                            <button
                                className="md:px-3 md:py-2 rounded-md font-bold text-xs  md:text-base text-primary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link
                                to="/login"
                                className=" flex items-center gap-1 text-primary font-bold"
                            >
                                Login
                                <BiLogInCircle className="text-lg" />
                            </Link>
                        </div>
                    )} */}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
