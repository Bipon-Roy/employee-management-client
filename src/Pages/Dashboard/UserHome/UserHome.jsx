import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserHome = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userInfo = [] } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`);
            return res.data;
        },
    });

    const handleUpdateInfo = (id) => {
        document.getElementById("my_modal_3").showModal();
        console.log(id);
    };
    const handleDeleteUser = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${id}`).then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        Swal.fire("Deleted!", "Your Account Deleted Successfully", "success");
                        logOut();
                    }
                });
            }
        });
    };
    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <div>
                        <form className=" space-y-4" onSubmit={handleUpdateInfo}>
                            <h1 className="font-bold text-lg text-center mb-4 capitalize">
                                Update Your Information
                            </h1>

                            <div className="form-control">
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered w-full focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    name="account_no"
                                    type="number"
                                    placeholder="Your Bank Account Number"
                                    className="input input-bordered w-full bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    name="phone"
                                    type="number"
                                    placeholder="Your Contact Number"
                                    className="input input-bordered w-full bg-white focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    name="designation"
                                    type="text"
                                    placeholder="Your Designation"
                                    className="input input-bordered w-full  focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    name="salary"
                                    type="number"
                                    placeholder="Your Salary"
                                    className="input input-bordered w-full  focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <textarea
                                    rows="4"
                                    name="address"
                                    type="number"
                                    placeholder="Your Address"
                                    className="pt-1 pl-4 rounded-lg border w-full border-[#D2D4D7] focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button className=" py-2 bg-primary uppercase font-medium text-white w-full rounded">
                                    Update Info
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
            <h1 className="px-6 lg:px-8 pt-8 text-3xl font-medium">Hi, Welcome</h1>

            <div className="p-6 lg:p-8 border m-5 md:m-8">
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <div className="avatar">
                        <div className="">
                            <img src={user.photoURL} alt={user.displayName} />
                        </div>
                    </div>
                    <div className="space-y-3 font-medium">
                        <h1 className="text-xl">{userInfo.name}</h1>
                        <p className="text-lg text-blue-500 font-semibold">
                            {userInfo.designation}
                        </p>
                        <p>Role: {userInfo.role}</p>
                        <p>Phone: {userInfo?.phone}</p>
                        <p>
                            <span className="font-semibold">Account No:</span> {userInfo.account_no}
                        </p>
                        <p>Salary: {userInfo.salary}</p>
                        <p>Address: {userInfo.address}</p>

                        <div className="pt-3 max-w-fit flex gap-10">
                            <button
                                onClick={() => handleUpdateInfo(userInfo._id)}
                                className="px-5 py-1 bg-primary text-white"
                            >
                                Update Information
                            </button>
                            <button
                                onClick={() => handleDeleteUser(userInfo._id)}
                                className="px-5 py-1 bg-red-600 text-white"
                            >
                                Delete Your Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHome;
