import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { useEffect, useState } from "react";
import useWorkSheet from "../../../../hook/useWorkSheet";
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Progress = () => {
    const axiosSecure = useAxiosSecure();
    const [taskList, setTaskList] = useState();
    const [employeeName, setEmployeeName] = useState([]);
    const [uniqueEmployee, setUniqueEmployee] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get(`/worksheet?employeeName=${employeeName}&month=${selectedMonth}`)
            .then((res) => {
                const employeeNames = [...new Set(res.data.map((item) => item.employeeName))];
                setUniqueEmployee(employeeNames); // Fix: Use setEmployeeNames, not setEmployeeName
                setTaskList(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [axiosSecure, employeeName, selectedMonth]);

    console.log(uniqueEmployee);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };
    const handleEmployeeChange = (event) => {
        setEmployeeName(event.target.value);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="overflow-x-auto">
                <div className="border p-4 mb-4 flex flex-col items-center justify-between">
                    <h1 className="mb-4 text-center text-mainText font-medium">Filter Worksheet</h1>
                    <div className="flex items-center gap-5">
                        <div className="form-control ">
                            <select
                                onChange={handleEmployeeChange}
                                className="input input-bordered focus:outline-none"
                            >
                                <option value="">Employee Name</option>
                                {uniqueEmployee.map((name, idx) => (
                                    <option key={idx} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control ">
                            <select
                                onChange={handleMonthChange}
                                className="input input-bordered focus:outline-none"
                            >
                                <option value="">Select Month</option>
                                {months.map((month, idx) => (
                                    <option key={idx} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <table className="table w-full">
                    {/* head */}
                    <thead className="text-center">
                        <tr className="text-primary text-lg font-bold bg-mainBg">
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Task</th>
                            <th>Hours</th>
                            <th>Date</th>
                            <th>Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.map((task, index) => (
                            <tr className="text-center" key={task._id}>
                                <th>{index + 1}</th>
                                <th>{task.employeeName}</th>
                                <td>{task.task}</td>
                                <td>{task.hours}</td>
                                <td>{task.date.split("T")[0]}</td>
                                <td>{task.month}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Progress;
