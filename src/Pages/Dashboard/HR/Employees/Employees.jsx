import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { ImCross } from "react-icons/im";
import { TbListDetails } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import Swal from "sweetalert2";
import Modal from "./Modal";
import { useState } from "react";

const Employees = () => {
    const axiosSecure = useAxiosSecure();
    const [employee, setEmployee] = useState({});
    const { data: employees = [], refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees");
            return res.data;
        },
    });
    const handlePayment = (data) => {
        document.getElementById("my_modal_3").showModal();
        setEmployee(data);
    };
    const handleUnVerified = (id) => {
        const status = {
            verified: false,
        };
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to change the verified status!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change It!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/employees/${id}`, status).then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Welcome!",
                            text: "Employee verified Successfully ",
                        });
                    }
                });
            }
        });
    };

    const handleVerified = (id) => {
        const status = {
            verified: true,
        };
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to verify the employee!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Verify!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/employees/${id}`, status).then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Welcome!",
                            text: "Employee verified Successfully ",
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="p-8">
            <h1 className="text-lg font-medium ml-1 text-mainText">
                Total Employees: {employees.length}
            </h1>
            <div className="overflow-x-auto mt-5">
                <table className="table w-auto ">
                    {/* head */}
                    <thead className="text-center">
                        <tr className="text-primary  lg:text-lg font-bold bg-mainBg">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Bank Account</th>
                            <th>Salary</th>
                            <th>Pay</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs lg:text-base">
                        {employees.map((employee, index) => (
                            <tr className="text-center" key={employee._id}>
                                <th>{index + 1}</th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {employee.verified === true ? (
                                        <button onClick={() => handleUnVerified(employee._id)}>
                                            <TiTick className="p-[1px] text-white bg-green-500 text-lg" />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleVerified(employee._id)}>
                                            <ImCross className="text-red-600" />
                                        </button>
                                    )}
                                </td>
                                <td>{employee.account_no}</td>
                                <td>{employee.salary}$</td>
                                <td>
                                    {employee.verified === true ? (
                                        <button
                                            onClick={() => handlePayment(employee)}
                                            className="bg-[#da2c38] text-white py-1 px-3"
                                        >
                                            Pay
                                        </button>
                                    ) : (
                                        <button className="disabled bg-gray-500 text-white py-1 px-3">
                                            Pay
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <button className="bg-gradient-to-r from-cyan-600 to-blue-600 py-1 px-2 flex items-center gap-1 text-white">
                                            Details <TbListDetails />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal employee={employee} />
            </div>
        </div>
    );
};

export default Employees;
