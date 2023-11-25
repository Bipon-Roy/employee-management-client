import itImg from "../../../assets/Business/It.jpg";
import banking from "../../../assets/Business/banking.jpg";
import healthCare from "../../../assets/Business/medical-team.jpg";
import callCenter from "../../../assets/Business/callcenter.jpg";
import forensic from "../../../assets/Business/forensic.jpg";
import education from "../../../assets/Business/education.jpg";
import AreaCard from "./AreaCard";

const BusinessArea = () => {
    return (
        <div className="mt-8">
            <div className="flex justify-center mb-3">
                <p className="bg-mainBg max-w-fit px-3 py-1 text-mainText font-medium rounded-md ">
                    Industries We Serve
                </p>
            </div>
            <h1 className="text-center text-4xl font-semibold">
                Across different{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                    business verticals
                </span>
            </h1>

            <div className="mx-5 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <AreaCard img={itImg} title="It Industry" />
                <AreaCard img={banking} title="Banking" />
                <AreaCard img={healthCare} title="HealthCare" />
                <AreaCard img={callCenter} title="Call Center" />
                <AreaCard img={forensic} title="Forensic" />
                <AreaCard img={education} title="Education" />
            </div>
        </div>
    );
};

export default BusinessArea;
