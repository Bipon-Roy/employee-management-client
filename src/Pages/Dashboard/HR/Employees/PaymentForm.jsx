import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import useAuth from "../../../../hook/useAuth";

const PaymentForm = ({ employee }) => {
    const { name, email, salary } = employee;
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [transactionId, setTransactionId] = useState("");

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

    useEffect(() => {
        if (salary > 0) {
            axiosSecure.post("/create-payment-intent", { price: salary }).then((res) => {
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [axiosSecure, salary]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const salaryOfMonth = formData.get("month");
        const salary = formData.get("salary");
        const year = formData.get("year");

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("[error]", error);
            setError(error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            setError("");
        }

        //confirm payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            }
        );

        if (confirmError) {
            console.log("confirm error");
        }
        if (paymentIntent) {
            console.log("Payment Intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
            }

            //save payment info into the database
            const payment = {
                name,
                email,
                salary,
                salaryOfMonth,
                transactionId: paymentIntent.id,
                date: new Date(), // utc date convert. use moment js to
                year,
            };
            const res = await axiosSecure.post("/payments", payment);
            console.log("payment saved", res.data);

            if (res.data?.paymentResult?.insertedId) {
                toast.success("Payment Successful!");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toaster />
            <div className="border p-6 space-y-4">
                <div className="form-control">
                    <input
                        name="salary"
                        required
                        type="number"
                        placeholder="Years"
                        className="input input-bordered focus:outline-none"
                        defaultValue={employee.salary}
                    />
                </div>
                <div className="form-control ">
                    <select name="month" className="input input-bordered focus:outline-none">
                        <option value="">Select Month</option>
                        {months.map((month, idx) => (
                            <option key={idx} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <input
                        name="year"
                        type="number"
                        required
                        placeholder="Year"
                        className="input input-bordered focus:outline-none"
                    />
                </div>

                {/* CardElement integration */}
                <div className="form-control">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                    />
                </div>

                <button
                    className="btn btn-sm btn-primary mt-4"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>

                <p className="text-red-600 my-2">{error}</p>

                {transactionId && (
                    <p className="text-green-600 my-2">Your Transaction Id: {transactionId}</p>
                )}
            </div>
        </form>
    );
};
PaymentForm.propTypes = {
    employee: PropTypes.object,
};
export default PaymentForm;
