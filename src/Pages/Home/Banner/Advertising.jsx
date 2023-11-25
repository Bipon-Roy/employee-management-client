import dashboard from "../../../assets/Dashboard.png";
const Advertising = () => {
    return (
        <div className="max-w-7xl mx-auto py-8">
            <div>
                <h1 className="text-mainText text-2xl lg:text-4xl text-center font-semibold mb-1">
                    &ldquo;Simplify Employee Management with Us&rdquo;
                </h1>
                <img className="p-5" src={dashboard} alt="#EmployeeManagementDashboard" />
            </div>
        </div>
    );
};

export default Advertising;
