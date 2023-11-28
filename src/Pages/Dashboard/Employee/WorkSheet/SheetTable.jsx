import PropTypes from "prop-types";

const SheetTable = ({ workSheets }) => {
    return (
        <div className="p-8">
            <h2 className="text-xl mb-4">Total Task: {workSheets.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="text-center">
                        <tr className="text-primary text-lg font-bold bg-mainBg">
                            <th>#</th>
                            <th>Task</th>
                            <th>Hours</th>
                            <th>Date</th>
                            <th>Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workSheets.map((task, index) => (
                            <tr className="text-center" key={task._id}>
                                <th>{index + 1}</th>
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
SheetTable.propTypes = {
    workSheets: PropTypes.array.isRequired,
};
export default SheetTable;
