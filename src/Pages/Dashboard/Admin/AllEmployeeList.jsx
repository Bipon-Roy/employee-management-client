import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { TiTick } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";
import { FaFire, FaTable } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { useState } from "react";
import CardView from "./CardView";
import Swal from "sweetalert2";

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

    const handleMakeHR = (id) => {
        const role = {
            role: "HR",
        };
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to promote him as HR",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Promote!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/employees/promotion/${id}`, role).then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Welcome!",
                            text: "Verified Status Changed Successfully ",
                        });
                    }
                });
            }
        });
    };

    const handleCardView = () => {
        setTableView(false);
        setCardView(true);
    };

    const handleTableView = () => {
        setCardView(false);
        setTableView(true);
    };

    const handleMakeFired = (id, name) => {
        console.log(id);

        const isFired = {
            isFired: "Fired",
        };

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to Fire ${name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Fire!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/employees/fired/${id}`, isFired).then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Welcome!",
                            text: `${name} Fired Successfully `,
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="px-4 py-2 md:p-8">
            <div className="p-4 border mb-4 flex justify-end">
                {cardView === false ? (
                    <button
                        onClick={handleCardView}
                        className="flex items-center gap-1 bg-primary px-3 py-1 font-medium text-white"
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
                        <FaTable />
                    </button>
                )}
            </div>
            <h1 className="text-lg font-medium ml-1 text-mainText">
                Total Employees: {employees.length}
            </h1>
            {cardView === true ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {employees.map((employee) => (
                        <CardView
                            key={employee._id}
                            handleMakeHR={handleMakeHR}
                            handleMakeFired={handleMakeFired}
                            employee={employee}
                        ></CardView>
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
                                        <div className="flex flex-col items-center gap-2 justify-center">
                                            <button
                                                onClick={() => handleMakeHR(employee._id)}
                                                className="flex items-center bg-orange-500 px-2 py-1 text-white gap-2"
                                            >
                                                Make HR <GrUserAdmin />
                                            </button>
                                            <p className="font-medium bg-mainBg px-1 max-w-fit">
                                                {employee.role}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex text-center justify-center">
                                            {employee.isFired ? (
                                                <p className="flex items-center font-semibold text-red-600 px-2 py-1 gap-1">
                                                    Fired <FaFire />
                                                </p>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleMakeFired(employee._id, employee.name)
                                                    }
                                                    className="flex items-center bg-red-600 px-2 py-1 text-white gap-1"
                                                >
                                                    Fire <FaFire />
                                                </button>
                                            )}
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
