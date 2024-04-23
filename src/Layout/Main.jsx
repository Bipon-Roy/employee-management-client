import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useEffect } from "react";

const Main = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-none">
                <Navbar />
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
            <div className="flex-none">
                <Footer />
            </div>
        </div>
    );
};

export default Main;
