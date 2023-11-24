import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { BiLogInCircle } from "react-icons/bi";
import SocialLogin from "../../Components/SocialLogin";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAxiosSecure from "../../hook/useAxiosSecure";

const image_host_keys = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_keys}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const [showPassword, setShowPassword] = useState(false);
    const { createUser, handleUpdateProfile } = useAuth();
    const route = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        let photoURL = formData.get("photoURL");
        const email = formData.get("email");
        const password = formData.get("password");
        const account_no = formData.get("account_no");
        const salary = formData.get("salary");
        const role = formData.get("role");
        const address = formData.get("address");

        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Password Should be at least 6 characters or longer",
            });
            return;
        } else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Your password should have at least one Uppercase characters",
            });
            return;
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Your password should have at least one Special characters",
            });
            return;
        }
        const imageFile = { image: photoURL };
        const res = await axiosPublic.post(image_host_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        if (res.data.success) {
            photoURL = res.data.data.display_url;
            const userInfo = {
                name,
                email,
                account_no,
                salary,
                role,
                address,
                image: photoURL,
            };
            createUser(email, password)
                .then(() => {
                    handleUpdateProfile(name, photoURL);

                    axiosPublic.post("/users", userInfo).then((res) => {
                        if (res.data.insertedId) {
                            console.log("user added to the database");
                            formData.reset();
                            Swal.fire({
                                icon: "success",
                                title: "Welcome!",
                                text: "User created successfully!",
                            });
                            route("/");
                            window.location.reload();
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mx-4 md:mx-auto md:w-[75%] lg:w-1/2 shadow-lg border p-4 md:p-8">
                <form className=" space-y-4" onSubmit={handleRegister}>
                    <h1 className="font-bold text-lg text-center mb-4 uppercase">Register Here</h1>
                    <div className="flex gap-3 md:gap-6">
                        <div className="form-control md:w-1/2">
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full focus:outline-none"
                                required
                            />
                        </div>
                        <div className="form-control md:w-1/2">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 md:gap-6">
                        <div className="form-control relative md:w-1/2">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered w-full bg-white focus:outline-none"
                                required
                            />
                            <span
                                className="text-lg absolute top-3 right-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="form-control md:w-1/2">
                            <input
                                name="account_no"
                                type="number"
                                placeholder="Your Bank Account Number"
                                className="input input-bordered w-full bg-white focus:outline-none"
                                required
                            />
                        </div>
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
                        <label className="label">
                            <span className="label-text text-[#22223b] font-semibold">
                                User Role
                            </span>
                        </label>
                        <select
                            required
                            name="role"
                            className="input input-bordered w-full  focus:outline-none"
                        >
                            <option value="" disabled>
                                Choose User Role
                            </option>
                            <option value="Employee">Employee</option>
                            <option value="HR">HR</option>
                        </select>
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
                    <div className="form-control">
                        <label className="label">
                            <span className="">Upload Your Photo</span>
                        </label>
                        <input
                            name="photoURL"
                            type="file"
                            className="file-input w-full max-w-xs "
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className=" py-2 bg-primary uppercase font-medium text-white w-full rounded">
                            Register
                        </button>
                    </div>

                    <div className="font-semibold flex justify-between text-base">
                        Already have an account?
                        <Link to="/login" className=" flex items-center gap-1 text-[#3f37c9]">
                            Login Here <BiLogInCircle className="text-lg" />
                        </Link>
                    </div>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default SignUp;
