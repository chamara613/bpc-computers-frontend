import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export default function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function sendOtp() {
        setOtpSent(true);
        try{
            await axios.post(import.meta.env.VITE_API_URL + "/user/send-otp", {email : email});
            toast.success("OTP sent to your email. Please check your inbox.");
        }
        catch(error){
            console.error(error?.response?.data?.message || "Failed to send OTP. Please try again.");
            setOtpSent(false);
        }
    }
    async function resetPassword() {
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try{
            await axios.post(import.meta.env.VITE_API_URL + "/user/verify-otp", {
                email : email,
                otp : otp,
                newPassword : newPassword
            });
            toast.success("Password reset successfully.");
            navigate("/login");
        }
        catch(error){
            console.error(error?.response?.data?.message || "Failed to reset password. Please try again.");
        }
    }

    return(
        <div className="w-full min-h-screen items-center bg-dominant pt-16 lg:pt-25">
            {!otpSent && 
                <div className="w-full max-w-[400px] bg-dominant rounded-[20px] p-5 mx-auto flex flex-col items-center gap-5">

                <h1 className="text-2xl font-bold text-secondary">
                    Forgot Password
                </h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-[40px] rounded-md p-2 outline-none focus:ring-2 focus:ring-accent border border-secondary"
                />
                <button
                    onClick={sendOtp}
                    className="w-full bg-accent text-white py-2 rounded-md hover:bg-accent-70 hover:cursor-alias transition-colors"
                >
                    Send OTP
                </button>
            </div>}
            {
                otpSent &&
                <div className="w-full max-w-[400px] bg-dominant rounded-[20px] p-5 mx-auto flex flex-col items-center gap-5">
                    <h1 className="text-2xl font-bold text-secondary">
                        Verify OTP
                    </h1>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full h-[40px] rounded-md p-2 outline-none focus:ring-2 focus:ring-accent border border-secondary"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full h-[40px] rounded-md p-2 outline-none focus:ring-2 focus:ring-accent border border-secondary"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full h-[40px] rounded-md p-2 outline-none focus:ring-2 focus:ring-accent border border-secondary"
                    />
                    <button
                        onClick={resetPassword}
                        className="w-full bg-accent text-white py-2 rounded-md hover:bg-accent-70 hover:cursor-alias transition-colors"
                    >
                        Reset Password
                    </button>
                </div>
            }
        </div> 
    )
}