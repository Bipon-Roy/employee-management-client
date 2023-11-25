import PropTypes from "prop-types";

const AreaCard = ({ img, title }) => {
    return (
        <div className="shadow relative rounded-lg">
            <div>
                <img
                    src={img}
                    className="rounded-lg w-full h-[280px]"
                    alt="EmployeeManagementBusiness"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-60 rounded-lg"></div>
            </div>
            <p className="absolute text-2xl text-white font-semibold bottom-2 left-36">{title}</p>
        </div>
    );
};
AreaCard.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
export default AreaCard;
