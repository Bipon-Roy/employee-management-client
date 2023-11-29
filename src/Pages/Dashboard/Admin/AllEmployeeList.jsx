import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { TiTick } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";
import { FaFire } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { useState } from "react";
import CardView from "./CardView";
const AllEmployeeList = () => {
    const [cardView, setCardView] = useState(false);
    const [tableView, setTableView] = useState(false);

    const axiosSecure = useAxiosSecure();
    const { data: employees = [], refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees/isVerified");
            return res.data;
        },
    });

    const handleCardView = () => {
        setTableView(false);
        setCardView(true);
    };

    const handleTableView = () => {
        setCardView(false);
        setTableView(true);
    };
    return (
        <div className="p-8">
            <div className="p-4 border mb-4 flex justify-end">
                {cardView === false && tableView === true ? (
                    <button
                        onClick={handleCardView}
                        className="flex items-center gap-1 bg-yellow-500 px-3 py-1 font-medium text-white"
                    >
                        Card View
                        <IoCardOutline />
                    </button>
                ) : (
                    <button
                        onClick={handleTableView}
                        className="flex items-center gap-1 bg-primary px-3 py-1 font-medium text-white"
                    >
                        Table View
                        <IoCardOutline />
                    </button>
                )}
            </div>
            <h1 className="text-lg font-medium ml-1 text-mainText">
                Total Employees: {employees.length}
            </h1>
            {cardView === true ? (
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {employees.map((employee) => (
                        <CardView key={employee._id} employee={employee}></CardView>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto mt-5">
                    <table className="table w-full ">
                        {/* head */}
                        <thead className="text-center">
                            <tr className="text-primary  lg:text-lg font-bold bg-mainBg">
                                <th>#</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Verified</th>
                                <th>Make HR</th>
                                <th>Fire</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs lg:text-base">
                            {employees.map((employee, index) => (
                                <tr className="text-center" key={employee._id}>
                                    <th>{index + 1}</th>
                                    <td>{employee.name}</td>
                                    <td>{employee.designation}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <TiTick className="p-[1px] text-white bg-green-500 text-lg" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="flex items-center bg-orange-500 px-2 py-1 text-white gap-2">
                                                Make HR <GrUserAdmin />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="flex items-center bg-red-600 px-2 py-1 text-white gap-1">
                                                Fire <FaFire />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllEmployeeList;
