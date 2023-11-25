import { TiTick } from "react-icons/ti";
import PropTypes from "prop-types";

const ServiceCard = ({ serviceInfo }) => {
    const { name, users, price, services } = serviceInfo;
    return (
        <div className="card bg-base-100 shadow border">
            <div className="font-medium text-center space-y-2">
                <h1 className="text-blue-700 text-2xl font-semibold uppercase mt-4">{name}</h1>
                <p className="text-sm">{users}.</p>
                <p className="text-primary font-bold text-4xl">${price}</p>
                <div className="flex justify-center">
                    <p className="py-1 px-4 border max-w-fit rounded-md">
                        /user /month paid yearly
                    </p>
                </div>
            </div>
            <div className="card-body">
                {services.map((serviceInfo, idx) => (
                    <p key={idx} className="flex">
                        <TiTick className="text-2xl text-primary" /> {serviceInfo}
                    </p>
                ))}
                <div className="card-actions mt-3">
                    <button className="bg-gradient-to-r from-cyan-600 to-blue-600 py-1 rounded-md w-full text-white text-lg">
                        Subscribe Now
                    </button>
                </div>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    serviceInfo: PropTypes.object.isRequired,
};
export default ServiceCard;
