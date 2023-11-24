import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { signInWithGoogle, signInWithFacebook } = useAuth();
    const route = useNavigate();
    const location = useLocation();

    const handleSocialLogin = (method) => {
        method()
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
                console.error(error);
            });
    };
    return (
        <>
            <div className="divider font-bold my-4">Social Login</div>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between">
                <button
                    onClick={() => handleSocialLogin(signInWithGoogle)}
                    className="font-semibold flex justify-between gap-4 px-4 py-2 bg-white rounded-3xl items-center  border-2"
                >
                    Continue With Google
                    <FcGoogle className=" text-3xl" />
                </button>
                <button
                    onClick={() => handleSocialLogin(signInWithFacebook)}
                    className="font-semibold flex justify-between gap-4 px-4 py-2 border-2 bg-white rounded-3xl items-center "
                >
                    Continue With Facebook
                    <FaFacebook className="text-3xl text-[#4361ee]" />
                </button>
            </div>
        </>
    );
};

export default SocialLogin;
