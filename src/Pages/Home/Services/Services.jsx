import useServices from "../../../hook/useServices";
import ServiceCard from "./ServiceCard";
const Services = () => {
    const [servicesCollection] = useServices();

    return (
        <div>
            <h1 className="text-center font-semibold text-2xl md:text-4xl mt-10">
                Service Packages:
                <span className="text-primary">Tailored Solutions for Every Need.</span>
            </h1>

            <div className="grid grid-cols-3 mt-6">
                {servicesCollection.map((serviceInfo) => (
                    <ServiceCard key={serviceInfo._id} serviceInfo={serviceInfo} />
                ))}
            </div>
        </div>
    );
};

export default Services;
