import BusinessArea from "../Availablity/BusinessArea";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import SupportedOS from "../SupportedOS/SupportedOS";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner />
            <div className="max-w-7xl mx-auto">
                <SupportedOS />
                <BusinessArea />
                <Services />
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;
