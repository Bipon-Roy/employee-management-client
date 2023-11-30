import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hook/useAuth";
import useAxiosSecure from "../../../../hook/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const { data: { payments = [], totalPayments = 0 } = {} } = useQuery({
        queryKey: ["payments", user.email, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments/${user.email}?page=${currentPage}&pageSize=${pageSize}`
            );
            return res.data;
        },
    });

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-medium mb-4">Total Payments: {totalPayments}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="text-center">
                        <tr className="text-primary md:text-lg font-bold bg-mainBg">
                            <th>#</th>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-xs md:text-base w-auto">
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <th>{payment.salaryOfMonth}</th>
                                <td>${payment.salary}</td>
                                <td>{payment.date.split("T")[0]}</td>
                                <td>{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPayments > 5 && (
                <div className="flex items-center justify-between mt-5">
                    <button
                        className={`${
                            currentPage === 1 ? "bg-gray-400" : "bg-primary"
                        } px-2 py-1 text-white`}
                        onClick={handlePrevPage}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                        className={`${
                            pageSize * currentPage >= totalPayments ? "bg-gray-400" : "bg-primary"
                        } px-2 py-1 text-white`}
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
