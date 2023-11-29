import { GrUserAdmin } from "react-icons/gr";
import { FaFire } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import PropTypes from "prop-types";

const CardView = ({ employee }) => {
    const { image, name, designation } = employee;

    return (
        <div className="card border">
            <div className="avatar flex justify-center mt-5">
                <div className="w-24 rounded-full">
                    <img src={image} alt={name} className="rounded-xl" />
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-center items-center gap-1">
                    <h2 className="text-lg text-center mb-1">{name}</h2>
                    <TiTick className="p-[1px] text-white bg-green-500 text-lg rounded-full" />
                </div>
                <p className="text-xl font-medium text-center">{designation}</p>
                <div className="flex justify-evenly my-3">
                    <button className="flex items-center bg-orange-500 px-2 py-1 text-white gap-2">
                        Make HR <GrUserAdmin />
                    </button>
                    <button className="flex items-center bg-red-600 px-2 py-1 text-white gap-1">
                        Fire <FaFire />
                    </button>
                </div>
            </div>
        </div>
    );
};
CardView.propTypes = {
    employee: PropTypes.object,
};
export default CardView;
