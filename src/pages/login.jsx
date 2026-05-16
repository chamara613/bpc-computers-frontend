// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";



// export default function LoginPage() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();



//     async function login() {
//         try {
//             const response = await axios.post(import.meta.env.VITE_API_URL + "/user/login", {
//                 email: email,
//                 password: password
//             });
//             console.log(response)
//             toast.success("Logged in successfully");
//             localStorage.setItem("token", response.data.token);
            
//             if(response.data.role == "admin"){
//                 //window.location.href = "/admin/"
//                 navigate("/admin")
//             }else{
//                 //window.location.href = "/"
//             }

//             toast.success("Logged in successfully");
//         } catch (error) {
//             toast.error(error?.response?.data?.message || "Failed to log in");
//         }
//     }

//     return (
//     <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-no-repeat flex items-center justify-center">

//         <div className="h-full w-[50%] flex item-left top-0">
//             <img src="/logo.png" alt="logo"/>
//         </div>

//         <div className="h-full w-[50%] flex items-center justify-center relative">
//             <div className="backdrop-blur-md border-2 w-112.5 h-150 flex flex-col items-center justify-center rounded-md">

//                 <input 
//                     type="email"
//                     id="email" 
//                     placeholder="Email" 
//                     className="m-5 p-3 w-[90%] rounded-md border border-secondary outline-none"
//                     onChange={
//                         (e)=>{
//                             setEmail(e.target.value)
//                         }
//                     }
//                     />
//                 <input type="password"
//                 id="password" placeholder="Password" className="m-5 p-3 w-[90%] rounded-md border border-secondary outline-none"
//                 onChange={
//                     (e)=>{
//                         setPassword(e.target.value)
//                     }
//                 }
//                 />
//                 <p className="w-full text-right p-3"><Link to="/forgot-password" className="text-secondary underline">Forgot password?</Link></p>
//                 <button onClick={login} className="bg-secondary text-primary p-3 w-[90%] rounded-md mt-5">Login</button>
//                 <button className="bg-transparent border border-secondary text-secondary p-3 w-[90%] rounded-md mt-5">Login with google</button>
//                 <p className="w-full text-right p-5">don't have an account? <Link to="/register" className="text-secondary underline">Register</Link></p>
//             </div>
//         </div>

    

//     </div>
//     )
// }

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function login() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/user/login",
                {
                    email,
                    password
                }
            );

            toast.success("Logged in successfully");

            localStorage.setItem(
                "token",
                response.data.token
            );

            if (response.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to log in"
            );
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex">

            {/* Left Side Logo */}
            <div className="hidden lg:flex w-1/2 items-center justify-center">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[500px] drop-shadow-2xl"
                />
            </div>

            {/* Right Side Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-5">

                <div className="w-full max-w-md p-8 rounded-3xl
                bg-white/10 backdrop-blur-xl
                border border-white/20
                shadow-2xl">

                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-white text-center mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-center text-white/70 mb-8">
                        Login to your BPC Computer account
                    </p>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full p-4 mb-5 rounded-xl
                        bg-white/10 border border-white/20
                        text-white placeholder-white/60
                        outline-none focus:ring-2
                        focus:ring-cyan-400"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full p-4 mb-3 rounded-xl
                        bg-white/10 border border-white/20
                        text-white placeholder-white/60
                        outline-none focus:ring-2
                        focus:ring-cyan-400"
                    />

                    {/* Forgot Password */}
                    <div className="flex justify-end mb-5">
                        <Link
                            to="/forgot-password"
                            className="text-cyan-300 hover:text-cyan-400 text-sm"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={login}
                        className="w-full p-4 rounded-xl
                        bg-cyan-500 hover:bg-cyan-600
                        text-white font-semibold
                        transition duration-300
                        shadow-lg hover:scale-105"
                    >
                        Login
                    </button>

                    {/* Google Login */}
                    <button
                        className="w-full mt-4 p-4 rounded-xl
                        border border-white/20
                        text-white hover:bg-white/10
                        transition duration-300"
                    >
                        Login with Google
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-white/70 mt-6">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-cyan-400 hover:underline"
                        >
                            Register
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}