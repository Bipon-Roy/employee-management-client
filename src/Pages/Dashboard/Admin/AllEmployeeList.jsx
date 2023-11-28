import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { TiTick } from "react-icons/ti";

const AllEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const { data: employees = [], refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees/isVerified");
            return res.data;
        },
    });
    console.log(employees);
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
                                <td>{employee.account_no}</td>
                                <td>{employee.salary}$</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEmployeeList;
