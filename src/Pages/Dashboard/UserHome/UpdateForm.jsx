import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import PropTypes from "prop-types";
const UpdateForm = ({ userInfo, refetch }) => {
    const { _id, name, email, account_no, phone, designation, salary, address } = userInfo;
    const axiosSecure = useAxiosSecure();

    const handleUpdateInfo = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const account_no = formData.get("account_no");
        const phone = formData.get("phone");
        const address = formData.get("address");

        const userData = {
            name,
            account_no,
            phone,
            address,
        };

        axiosSecure.patch(`user/${id}`, userData).then((res) => {
            if (res.status === 200) {
                toast.success("Information Successfully Updated!");
                refetch();
            }
        });
    };
    return (
        <form className="space-y-4" onSubmit={(e) => handleUpdateInfo(e, _id)}>
            <Toaster />
            <h1 className="font-bold text-lg text-center mb-4 capitalize">
                Update Your Information
            </h1>

            <div className="flex gap-4">
                <div className="form-control">
                    <label className="mb-1 opacity-70">Name</label>
                    <input
                        defaultValue={name}
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full focus:outline-none"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="mb-1 opacity-70">Email</label>
                    <input
                        defaultValue={email}
                        disabled
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full focus:outline-none"
                        required
                    />
                </div>
            </div>

            <div className="form-control">
                <label className="mb-1 opacity-70">Account Number</label>
                <input
                    defaultValue={account_no}
                    name="account_no"
                    type="number"
                    placeholder="Your Bank Account Number"
                    className="input input-bordered w-full bg-white focus:outline-none"
                    required
                />
            </div>
            <div className="form-control">
                <label className="mb-1 opacity-70">Contact Number</label>
                <input
                    defaultValue={phone}
                    name="phone"
                    type="number"
                    placeholder="Your Contact Number"
                    className="input input-bordered w-full bg-white focus:outline-none"
                    required
                />
            </div>

            <div className="flex gap-4">
                <div className="form-control">
                    <label className="mb-1 opacity-70">Designation</label>
                    <input
                        defaultValue={designation}
                        disabled
                        name="designation"
                        type="text"
                        placeholder="Your Designation"
                        className="input input-bordered w-full  focus:outline-none"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="mb-1 opacity-70">Salary</label>
                    <input
                        defaultValue={salary}
                        disabled
                        name="salary"
                        type="number"
                        placeholder="Your Salary"
                        className="input input-bordered w-full  focus:outline-none"
                        required
                    />
                </div>
            </div>

            <div className="form-control">
                <label className="mb-1 opacity-70">Address</label>
                <textarea
                    defaultValue={address}
                    rows="4"
                    name="address"
                    type="number"
                    placeholder="Your Address"
                    className="pt-1 pl-4 rounded-lg border w-full border-[#D2D4D7] focus:outline-none"
                    required
                />
            </div>

            <div className="form-control mt-6">
                <button
                    type="submit"
                    className=" py-2 bg-primary uppercase font-medium text-white w-full rounded"
                >
                    Update Info
                </button>
            </div>
        </form>
    );
};

UpdateForm.propTypes = {
    refetch: PropTypes.func.isRequired,
};
export default UpdateForm;
