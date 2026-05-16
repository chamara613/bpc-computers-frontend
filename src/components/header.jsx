import { Link } from "react-router-dom";
import UserData from "./userData";
import { BiShoppingBag } from "react-icons/bi";

export default function Header(){
    return(
        <header className="w-full bg-accent h-25 flex justify-center items-center sticky top-0 z-50 shadow-md backdrop-blur-md">
            <div className="h-full flex justify-center items-center absolute left-10">
                <img src="logo.png" alt="Logo" className="h-40" />
                
            </div>
            <div className="h-full flex justify-center items-center">
                <Link to="/" className="text-white mx-4 hover:border-b-2">Home</Link>
                <Link to="/products" className="text-white mx-4 hover:border-b-2">Products</Link>
                <Link to="/about" className="text-white mx-4 hover:border-b-2">About</Link>
                <Link to="/contact" className="text-white mx-4 hover:border-b-2">Contact</Link>
            

            </div>
                <div className="absolute right-10 flex items-center justify-center gap-4 px-4 py-2 rounded-lg">
                    
                    <Link to="/cart" className="cursor-pointer">
                        <BiShoppingBag size={30} color="white" />
                    </Link>

                    <UserData/>

                </div>
        </header>
    )
}