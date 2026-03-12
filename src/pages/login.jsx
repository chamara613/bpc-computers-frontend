import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
    <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-no-repeat flex items-center justify-center">

        <div className="h-full w-[50%] flex item-left top-0">
            <img src="/logo.png" alt="logo"/>
        </div>

        <div className="h-full w-[50%] flex items-center justify-center relative">
            <div className="backdrop-blur-md border-2 w-[450px] h-[600px] flex flex-col items-center justify-center rounded-md">

                <input type="email" id="email" placeholder="Email" className="m-5 p-3 w-[90%] rounded-md border border-secondary outline-none"/>
                <input type="password" id="password" placeholder="Password" className="m-5 p-3 w-[90%] rounded-md border border-secondary outline-none"/>
                <p className="w-full text-right p-3"><Link to="/forgot-password" className="text-secondary underline">Forgot password?</Link></p>
                <button className="bg-secondary text-primary p-3 w-[90%] rounded-md mt-5">Login</button>
                <button className="bg-transparent border border-secondary text-secondary p-3 w-[90%] rounded-md mt-5">Login with google</button>
                <p className="w-full text-right p-5">don't have an account? <Link to="/register" className="text-secondary underline">Register</Link></p>
            </div>
        </div>

    

    </div>
    )
}