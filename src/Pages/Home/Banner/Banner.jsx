import { Link } from "react-router-dom";
import bannerImg from "../../../assets/BannerVector.png";
import Advertising from "./Advertising";
const Banner = () => {
    return (
        <div
            className=""
            style={{
                backgroundImage:
                    "linear-gradient(to bottom, rgba(137, 194, 217, 0.4), rgba(97, 165, 194, 0.1))",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto ">
                <div className="mt-8 mx-5 text-mainText md:w-1/2 lg:w-full">
                    <h1 className="text-2xl lg:text-4xl font-bold mb-4">
                        Unlock Seamless
                        <span className="text-primary"> Employee Management Solutions.</span>
                    </h1>
                    <p className="md:w-3/4 font-medium text-sm md:text-base mb-4">
                        Effortlessly manage your workforce and optimize HR tasks with our intuitive
                        Employee Management Services. Elevate productivity and enhance employee
                        satisfaction with our tailored solutions.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/rooms"
                            className="border-2 border-primary text-mainText px-10 py-2 text-xl font-semibold"
                        >
                            Explore
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 lg:w-full">
                    <img src={bannerImg} alt="#EmployeeManagementThumbnail" />
                </div>
            </div>
            <Advertising />
        </div>
    );
};

export default Banner;
