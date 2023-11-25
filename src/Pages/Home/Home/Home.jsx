import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner />
            <div className="max-w-7xl mx-auto">
                <Services />
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;
