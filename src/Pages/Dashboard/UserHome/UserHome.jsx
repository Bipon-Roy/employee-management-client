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
        console.log(id);

        // axiosSecure.put(`/user/${id}`).then((data) => {
        //     console.log(data);
        //     if (data.status === 200) {
        //         Swal.fire({
        //             icon: "success",
        //             title: "Welcome!",
        //             text: "Information Successfully Updated!",
        //         });
        //     }
        // });
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
            <h1 className="px-8 pt-8 text-3xl font-medium">Hi, Welcome</h1>

            <div className="p-8 border m-8">
                <div className="flex gap-8 justify-center items-center">
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
