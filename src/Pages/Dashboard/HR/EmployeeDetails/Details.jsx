import { TiTick } from "react-icons/ti";
import { useLoaderData } from "react-router-dom";
import Chart from "./Chart";

const Details = () => {
    const [employee] = useLoaderData();
    const { _id, image, name, designation } = employee;

    return (
        <div className="p-4 md:p-8">
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
                    <div className="flex justify-center mt-2">
                        <p className="font-medium bg-mainBg px-1 max-w-fit">{employee.role}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Chart id={_id} />
            </div>
        </div>
    );
};

export default Details;
