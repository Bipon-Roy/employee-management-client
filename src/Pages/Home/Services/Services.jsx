import useServices from "../../../hook/useServices";
import ServiceCard from "./ServiceCard";
const Services = () => {
    const [servicesCollection] = useServices();

    return (
        <div>
            <div className="text-center font-semibold mt-10">
                <h1 className="text-center font-semibold text-2xl md:text-4xl ">
                    Available{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                        Services
                    </span>
                </h1>
            </div>
            <div className="mx-6 lg:mx-0 grid md:grid-cols-2 gap-6 lg:grid-cols-3 mt-6">
                {servicesCollection.map((serviceInfo) => (
                    <ServiceCard key={serviceInfo._id} serviceInfo={serviceInfo} />
                ))}
            </div>
        </div>
    );
};

export default Services;
