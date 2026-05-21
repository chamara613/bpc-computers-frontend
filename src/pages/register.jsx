import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
        const googleLogin = useGoogleLogin(
        {
            onSuccess:(response) => {
                axios.post(import.meta.env.VITE_API_URL + "/user/google-login",{token : response.access_token}).then(
                    (response) => {
                toast.success("Google login successful");
                localStorage.setItem("token", response.access_token);
                if(response.data.role == "admin"){
                    navigate("/admin");
                }else{
                    navigate("/");
                }
            }
            ).catch(
                (error) => {
                    console.error(error?.response?.data?.message || "Google login failed. Please try again.");
                    toast.error("Google login failed. Please try again.");
                }
            )

            },
            onError: (error) => {
                toast.error("Google login failed. Please try again.");
            }   
        }
    );


    async function register() {

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            toast.error("Please fill in all fields.");
            return;
        }

        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(
                import.meta.env.VITE_API_URL + "/user/",
                {
                    firstName,
                    lastName,
                    email,
                    password
                }
            );

            toast.success("Registered successfully");
            navigate("/login");

        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Registration failed"
            );
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row overflow-auto">

            {/* Left Side */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-5">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-40 sm:w-56 md:w-72 lg:w-[500px] drop-shadow-2xl"
                />
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-5">

                <div
                    className="w-full max-w-md p-6 sm:p-8 rounded-3xl
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    shadow-2xl"
                >

                    <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-2">
                        Create Account
                    </h1>

                    <p className="text-center text-white/70 mb-8 text-sm sm:text-base">
                        Join BPC Computer
                    </p>

                    {/* Names */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-5">

                        <input
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(e.target.value)
                            }
                            type="text"
                            placeholder="First Name"
                            className="w-full sm:w-1/2 p-3 rounded-xl
                            bg-white/10 border border-white/20
                            text-white placeholder-white/60
                            outline-none focus:ring-2 focus:ring-cyan-400"
                        />

                        <input
                            value={lastName}
                            onChange={(e) =>
                                setLastName(e.target.value)
                            }
                            type="text"
                            placeholder="Last Name"
                            className="w-full sm:w-1/2 p-3 rounded-xl
                            bg-white/10 border border-white/20
                            text-white placeholder-white/60
                            outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 mb-5 rounded-xl
                        bg-white/10 border border-white/20
                        text-white placeholder-white/60
                        outline-none focus:ring-2 focus:ring-cyan-400"
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-5 rounded-xl
                        bg-white/10 border border-white/20
                        text-white placeholder-white/60
                        outline-none focus:ring-2 focus:ring-cyan-400"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    {/* Confirm Password */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-3 mb-6 rounded-xl
                        bg-white/10 border border-white/20
                        text-white placeholder-white/60
                        outline-none focus:ring-2 focus:ring-cyan-400"
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    {/* Register Button */}
                    <button
                        onClick={register}
                        className="w-full p-3 rounded-xl
                        bg-cyan-500 hover:bg-cyan-600
                        text-white font-semibold
                        transition duration-300
                        shadow-lg hover:scale-105"
                    >
                        Sign Up
                    </button>

                    {/* Google Button */}
                    <button
                        onClick={googleLogin}
                        className="w-full mt-4 p-3 rounded-xl
                        border border-white/20
                        text-white hover:bg-white/10
                        transition"
                    >
                        Sign up with Google
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-white/70 mt-6 text-sm sm:text-base">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-cyan-400 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}