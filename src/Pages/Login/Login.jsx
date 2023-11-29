import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import loginImage from "../../../src/assets/login.png";

import Swal from "sweetalert2";

import useAuth from "../../hook/useAuth";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { logIn } = useAuth();

    const route = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        logIn(email, password)
            .then((result) => {
                console.log(result.user);
                route(location?.state ? location.state : "/");
                Swal.fire({
                    icon: "success",
                    title: "Welcome!",
                    text: "Login Successful!",
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.message,
                });
            });
    };

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center bg-mainBg max-w-7xl mx-auto">
            <div className="">
                <img className="" src={loginImage} alt="LoginPageVector" />
            </div>
            <div className="w-full p-8 md:w-3/4 lg:w-1/2">
                <form className="mx-auto space-y-4" onSubmit={handleLogin}>
                    <h1 className="font-bold text-center mb-5 text-xl text-[#22223b] uppercase">
                        Login Here
                    </h1>
                    <div className="form-control">
                        <input
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            className="input w-full input-bordered focus:outline-none"
                            required
                        />
                    </div>

                    <div className="form-control relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Your Password"
                            className="input w-full input-bordered focus:outline-none"
                            required
                        />
                        <span
                            className="text-lg absolute top-3 right-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                        </span>
                    </div>

                    <div className="form-control mt-6">
                        <button className=" py-2 bg-primary font-medium text-white uppercase w-full rounded">
                            Login
                        </button>
                    </div>

                    <div className="font-medium flex justify-between">
                        New Here?
                        <Link to="/signup" className="underline font-semibold text-[#3f37c9]">
                            Create an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
