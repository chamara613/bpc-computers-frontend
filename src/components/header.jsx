
import { Link } from "react-router-dom";
import UserData from "./userData";
import { BiShoppingBag } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Header(){

    const [menuOpen, setMenuOpen] = useState(false);

    return(
        // <header className="w-full bg-accent sticky top-0 z-50 shadow-md ">
        <header className="w-full bg-accent fixed top-0 left-0 z-50 shadow-md">

            {/* Desktop Header */}
            <div className="hidden lg:flex h-25 justify-center items-center relative">

                {/* Logo */}
                <div className="absolute left-10 flex items-center">
                    <img
                        src="logo.png"
                        alt="Logo"
                        className="h-20"
                    />
                </div>

                {/* Navigation */}
                <div className="flex justify-center items-center">
                    <Link to="/" className="text-white mx-4 hover:border-b-2">
                        Home
                    </Link>

                    <Link to="/products" className="text-white mx-4 hover:border-b-2">
                        Products
                    </Link>

                    <Link to="/about" className="text-white mx-4 hover:border-b-2">
                        About
                    </Link>

                    <Link to="/contact" className="text-white mx-4 hover:border-b-2">
                        Contact
                    </Link>
                </div>

                {/* Right Side */}
                <div className="absolute right-10 flex items-center justify-center gap-4">

                    <Link to="/cart">
                        <BiShoppingBag
                            size={30}
                            color="white"
                        />
                    </Link>

                    <UserData/>

                </div>
            </div>

            {/* Mobile Header */}
            <div className="flex lg:hidden h-16 items-center justify-between px-4">

                {/* Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-white"
                >
                    {
                        menuOpen ?
                        <HiX size={30}/> :
                        <HiMenu size={30}/>
                    }
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src="logo.png"
                        alt="Logo"
                        className="h-20"
                    />

                    <h1 className="text-white font-semibold text-lg">
                        BPC Computers
                    </h1>
                </div>

                {/* Cart */}
                <Link to="/cart">
                    <BiShoppingBag
                        size={28}
                        color="white"
                    />
                </Link>
            </div>

            {/* Mobile Menu */}
            {
                menuOpen && (
                    <div className="lg:hidden bg-accent border-t border-white/20 flex flex-col px-5 py-4">

                        <Link
                            to="/"
                            className="text-white py-3 border-b border-white/20"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            to="/products"
                            className="text-white py-3 border-b border-white/20"
                            onClick={() => setMenuOpen(false)}
                        >
                            Products
                        </Link>

                        <Link
                            to="/about"
                            className="text-white py-3 border-b border-white/20"
                            onClick={() => setMenuOpen(false)}
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="text-white py-3 border-b border-white/20"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        <div className="pt-4">
                            <UserData/>
                        </div>

                    </div>
                )
            }

        </header>
    )
}