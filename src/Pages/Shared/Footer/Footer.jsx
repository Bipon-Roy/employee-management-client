import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo.png";
import useAuth from "../../../hook/useAuth";
const Footer = () => {
    const { user } = useAuth();
    const links = (
        <>
            <li className="mr-5 font-medium">
                <NavLink to="/">Home</NavLink>
            </li>
            <li className="mr-5 font-medium">
                <NavLink to="/contact">Contact Us</NavLink>
            </li>

            {user && (
                <>
                    <li className="mr-5 font-medium">
                        <NavLink to="/dashboard/home">Dashboard</NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 mt-10">
            <footer className="footer items-center py-10 text-base-content max-w-7xl mx-auto justify-between">
                <aside>
                    <img src={logo} className="w-20 h-20" alt="" />
                    <p className="text-white font-semibold">
                        Luxury Hotel Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav className="text-white font-semibold">
                    <header className="footer-title opacity-100">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <div className="text-white font-semibold list-none">
                    <header className="footer-title opacity-100">Company</header>
                    {links}
                </div>
                <nav className="text-white font-semibold">
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
