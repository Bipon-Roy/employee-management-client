import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { BiLogInCircle } from "react-icons/bi";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, handleUpdateProfile } = useAuth();
    const route = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const photoURL = formData.get("photoURL");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(name, photoURL, email, password);

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
        createUser(email, password)
            .then(() => {
                handleUpdateProfile(name, photoURL);
                Swal.fire({
                    icon: "success",
                    title: "Welcome!",
                    text: "Registration Successful!",
                });
                route("/");
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mx-auto w-[60%] shadow border-2 p-8">
                <form className="mx-auto space-y-4" onSubmit={handleRegister}>
                    <h1 className="font-bold text-lg text-center mb-4 uppercase">Register Here</h1>
                    <div className="form-control">
                        <input
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full bg-white"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-white"
                            required
                        />
                    </div>

                    <div className="form-control relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input input-bordered w-full bg-white"
                            required
                        />
                        <span
                            className="text-lg absolute top-3 right-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
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
            </div>
        </div>
    );
};

export default SignUp;
