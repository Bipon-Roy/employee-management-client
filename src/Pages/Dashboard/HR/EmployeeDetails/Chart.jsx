import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Chart.module.css";

const colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
    "#aec7e8",
    "#ffbb78",
];

const Chart = ({ id }) => {
    const axiosSecure = useAxiosSecure();
    const { data: stats = [] } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-payment-stat/${id}`);
            return res.data;
        },
    });

    const data = stats.map((item) => ({
        salary: item.salary,
        label: item.month.slice(0, 3) + " " + item.date.split("-")[0].slice(2, 4),
    }));

    const [chartWidth, setChartWidth] = useState(1000); // Initial width for larger screens

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setChartWidth(450);
            } else if (window.innerWidth < 1024) {
                setChartWidth(600);
            } else {
                setChartWidth(1000);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={styles.chartContainer}>
            {data.length > 0 ? (
                <BarChart
                    width={chartWidth}
                    height={400}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 30,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="label" />
                    <YAxis
                        label={{
                            value: "Salary",
                            angle: -90,
                            position: "insideLeft",
                            offset: -20,
                        }}
                        tickFormatter={(value) => `${value}$`}
                    />
                    <Tooltip />
                    <Legend />

                    <Bar barSize={100} dataKey="salary" fill="#82ca9d">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 12]} />
                        ))}
                    </Bar>
                </BarChart>
            ) : (
                <div>
                    <p className="text-center font-semibold text-2xl mt-8">
                        The User don&apos;t get any payment yet!! Please See another..
                    </p>
                </div>
            )}
        </div>
    );
};

Chart.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Chart;
