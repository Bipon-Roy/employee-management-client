import { useNavigate } from "react-router-dom";
import errorImage from "../../assets/Error.jpg";
const Error = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className="flex justify-center">
                <img className="md:h-[700px]" src={errorImage} alt="" />
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleNavigate}
                    className="px-5 py-2 bg-primary font-semibold text-white rounded"
                >
                    Back to home
                </button>
            </div>
        </div>
    );
};

export default Error;
