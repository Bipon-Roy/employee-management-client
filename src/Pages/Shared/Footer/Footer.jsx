import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo.png";
const Footer = () => {
    // const { user } = useContext(AuthContext);
    const links = (
        <>
            <li className="mr-5 font-medium">
                <NavLink to="/">Home</NavLink>
            </li>
            <li className="mr-5 font-medium">
                <NavLink to="/about">About</NavLink>
            </li>
            <li className="mr-5 font-medium">
                <NavLink to="/rooms">Rooms</NavLink>
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
        <div className="bg-[#f8f9fa] mt-10">
            <footer className="footer py-10 px-4 text-base-content max-w-7xl mx-auto place-items-center">
                <aside>
                    <img src={logo} className="w-20 h-20" alt="" />
                    <p className=" font-semibold">
                        Luxury Hotel Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav className=" font-semibold">
                    <header className="footer-title opacity-100">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <div className=" font-semibold list-none">
                    <header className="footer-title opacity-100">Company</header>
                    {links}
                </div>
                <nav className=" font-semibold">
                    <header className="footer-title opacity-100">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};
export default Footer;
