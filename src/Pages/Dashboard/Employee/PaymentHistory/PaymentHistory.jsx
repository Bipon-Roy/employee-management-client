import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hook/useAuth";
import useAxiosSecure from "../../../../hook/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-8">
            <h2 className="text-xl font-medium mb-4">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="text-center">
                        <tr className="text-primary text-lg font-bold bg-mainBg">
                            <th>#</th>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <th>{payment.salaryOfMonth}</th>
                                <td>${payment.salary}</td>
                                <td>{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
