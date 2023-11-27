import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useHR from "../hook/useHR";
import PropTypes from "prop-types";

const HrRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isHR, isHRLoading] = useHR();

    const location = useLocation();
    if (loading || isHRLoading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (user && isHR) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

HrRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default HrRoute;
