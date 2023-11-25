import PropTypes from "prop-types";
const OsCard = ({ img, text }) => {
    return (
        <div className="card">
            <figure className="px-10 pt-10">
                <img
                    src={img}
                    alt="#EmployeeManagementSupportedOS"
                    className="rounded-xl h-[100px]"
                />
            </figure>
            <div className="card-body items-center text-center pt-3">
                <p className="text-sm lg:text-lg font-medium">{text}</p>
            </div>
        </div>
    );
};
OsCard.propTypes = {
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
export default OsCard;
