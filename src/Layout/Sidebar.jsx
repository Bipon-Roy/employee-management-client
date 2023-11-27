import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

const Sidebar = ({ links }) => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content pl-8 ">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="p-4 drawer-button lg:hidden lg:absolute ">
                    <FaBars className="text-xl" />
                </label>
            </div>
            <div className="drawer-side z-10">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="px-6 py-4 w-1/2 md:w-72 space-y-5 min-h-screen  bg-mainBg font-medium text-mainText">
                    {/* Sidebar content here */}
                    {/*For Admin */}
                    {links}
                </ul>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    links: PropTypes.object.isRequired,
};

export default Sidebar;
