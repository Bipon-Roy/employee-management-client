import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
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
        month: item.month,
        salary: item.salary,
        date: item.date.split("-")[0],
        label: item.month + " " + item.date.split("-")[0],
    }));

    return (
        <div>
            {data.length > 0 ? (
                <BarChart
                    width={1000}
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
                        The User don&apos;t any payment yet!! Please See another..
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
