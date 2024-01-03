import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
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
