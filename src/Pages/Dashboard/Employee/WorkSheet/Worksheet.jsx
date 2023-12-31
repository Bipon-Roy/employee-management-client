import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useWorkSheet from "../../../../hook/useWorkSheet";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import SheetTable from "./SheetTable";
import Swal from "sweetalert2";
import useAuth from "../../../../hook/useAuth";

const Worksheet = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [date, setDate] = useState(new Date());
    const [refetch, workSheets] = useWorkSheet();
    const axiosSecure = useAxiosSecure();
    const currentMonth = date.toLocaleString("default", { month: "long" });

    useEffect(() => {
        setDate(date);
        setValue("month", currentMonth);
    }, [date, setValue, currentMonth]);

    const onSubmit = (data) => {
        const task = data.task;
        const hours = data.hours;
        const month = data.month;

        const workSheet = {
            employeeName: user.displayName,
            email: user.email,
            month,
            task,
            hours,
            date,
        };

        axiosSecure.post("/worksheet", workSheet).then((res) => {
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Welcome!",
                    text: "Task Added Successfully!",
                });
                reset();
                refetch();
            }
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-4">
                <div className="grid lg:grid-cols-5 gap-5 border p-5">
                    <div className="form-control">
                        <select
                            className="input input-bordered focus:outline-none"
                            {...register("task", { required: true })}
                        >
                            <option value="">Select Task</option>
                            <option value="Sales">Sales</option>
                            <option value="Support">Support</option>
                            <option value="Content">Content</option>
                            <option value="Paper-Work">Paper-Work</option>
                        </select>
                        {errors.task && (
                            <span className="text-red-600 mt-1 ml-2">Task is required</span>
                        )}
                    </div>
                    <div className="form-control ">
                        <input
                            type="text"
                            {...register("hours", { required: true })}
                            placeholder="Worked Hours"
                            className="input input-bordered focus:outline-none"
                        />

                        {errors.hours && (
                            <span className="text-red-600 mt-1 ml-2">Worked Hours is required</span>
                        )}
                    </div>
                    <div className="form-control ">
                        <DatePicker
                            className="input input-bordered focus:outline-none w-full lg:w-[160px]"
                            selected={date}
                            onChange={(date) => setDate(date)}
                        />
                    </div>
                    <div className="form-control ">
                        <input
                            type="text"
                            {...register("month", { required: true })}
                            placeholder="Month"
                            className="input input-bordered focus:outline-none"
                            defaultValue={currentMonth}
                        />

                        {errors.month && (
                            <span className="text-red-600 mt-1 ml-2">Month is required</span>
                        )}
                    </div>
                    <div className="form-control">
                        <input
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-md font-semibold text-white"
                            type="submit"
                            value="Add Work"
                        />
                    </div>
                </div>
            </form>

            <SheetTable workSheets={workSheets} />
        </div>
    );
};

export default Worksheet;
