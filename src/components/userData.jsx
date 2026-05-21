import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserData(){
    const [user , setUser] = useState(null)
    const [state , setState] = useState("me")
    const navigate = useNavigate();

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if(token != null){
                axios.get(import.meta.env.VITE_API_URL+"/user/profile",{
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                }).then(
                    (response) => {
                        console.log(response.data)
                        setUser(response.data)
                    }
                ).catch(
                        ()=>{
                            localStorage.removeItem("token")
                            navigate("/login")
                        }
                    )

            }
        },[]
    )
    return (
        <>
            {
                user == null ? (
                    <div className="w-[100px] h-[50px]">
                        <Link to="/login" className="text-white hover:border-b-2 mr-1">
                            Login
                        </Link>

                        <Link to="/register" className="text-white hover:border-b-2 ml-1">
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="w-[150px] h-[50px] flex justify-center items-center">

                        <div className="w-[150px] h-[50px] flex border border-white justify-between items-center rounded-full overflow-hidden">
                            <img
                                referrerPolicy="no-referrer"
                                src={user.image}
                                className="w-[50px] h-[50px] object-cover"
                                alt="profile"
                            />

                         
                            <select value={state}
                                onChange={
                                    (e)=>{
                                        const value = e.target.value;
                                        if(value === "orders"){
                                            navigate("/my-orders")
                                        }
                                        if(value === "settings"){
                                            navigate("/settings")
                                        }
                                        if(value === "logout"){
                                            localStorage.removeItem("token")
                                            navigate("/login")
                                        }
                                        setState("me")
                                    }
                                  
                                }
                                className="bg-accent/50 text-white"
                            >
                                <option value="me" className="bg-accent p-2">{user.firstName}</option>
                                <option value="orders" className="bg-accent p-2">My orders</option>
                                <option value="settings" className="bg-accent p-2">Settings</option>
                                <option value="logout" className="bg-accent p-2">Logout</option>

                            </select>
                            
                        </div>

                    </div>
                )
            }
         </>
    )
}