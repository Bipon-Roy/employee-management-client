import apple from "../../../assets/OS/apple.png";
import linux from "../../../assets/OS/linux-ubuntu.png";
import windows from "../../../assets/OS/windows.png";
import OsCard from "./OsCard";

const SupportedOS = () => {
    return (
        <div className="mt-16">
            <div className="flex justify-center mb-3">
                <p className="text-sm md:text-base bg-mainBg max-w-fit px-3 py-1 text-mainText font-medium rounded-md ">
                    Smart Integration Across Platforms
                </p>
            </div>
            <h1 className="text-center text-3xl md:text-4xl font-semibold">
                We are {""}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                    available on
                </span>
            </h1>
            <div className="mx-5 mt-5 grid md:grid-cols-3 gap-4 lg:gap-6">
                <OsCard img={apple} text="Mac 10.8 and Newer Versions" />
                <OsCard img={windows} text="Windows All Version, Server 2003/08/10/12, bit 32-64" />
                <OsCard img={linux} text="Linux/Ubuntu 16,18,20 Versions" />
            </div>
        </div>
    );
};

export default SupportedOS;
