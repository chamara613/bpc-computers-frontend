import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";



export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // function login() {
    //     console.log(email)
    //     console.log(password)  
    //     axios.post("http://localhost:3000/user/login", 
    //         { email :email , password : password }
    //     ).then((res)=>{
    //         console.log("logged in")
    //         console.log(res)

    //     }).catch(()=>{
    //         console.log("error logging in")
    //     })
    // }

    async function login() {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/user/login", {
                email: email,
                password: password
            });
            console.log(response)
            toast.success("Logged in successfully");
            localStorage.setItem("token", response.data.token);
            
            if(response.data.role == "admin"){
                //window.location.href = "/admin/"
                navigate("/admin")
            }else{
                //window.location.href = "/"
            }

            toast.success("Logged in successfully");
        } catch (error) {
            console.log("login failed");
            toast.error("Failed to log in");
        }
    }

    return (
    <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-no-repeat flex items-center justify-center">

        <div className="h-full w-[50%] flex item-left top-0">
            <img src="/logo.png" alt="logo"/>
        </div>

        <div className="h-full w-[50%] flex items-center justify-center relative">
            <div className="backdrop-blur-md border-2 w-112.5 h-150 flex flex-col items-center justify-center rounded-md">

                <input 
                    type="email"
                    id="email" 
                    placeholder="Email" 
                    className="m-5 p-3 w-[90%] rounded-md border border-secondary outline-none"
                    onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    }
                    />
                <input type="password"
                id="password" placeholder="Password" className="m-5 p-3 w-[90%] rounded-md border border-secondary outline-none"
                onChange={
                    (e)=>{
                        setPassword(e.target.value)
                    }
                }
                />
                <p className="w-full text-right p-3"><Link to="/forgot-password" className="text-secondary underline">Forgot password?</Link></p>
                <button onClick={login} className="bg-secondary text-primary p-3 w-[90%] rounded-md mt-5">Login</button>
                <button className="bg-transparent border border-secondary text-secondary p-3 w-[90%] rounded-md mt-5">Login with google</button>
                <p className="w-full text-right p-5">don't have an account? <Link to="/register" className="text-secondary underline">Register</Link></p>
            </div>
        </div>

    

    </div>
    )
}