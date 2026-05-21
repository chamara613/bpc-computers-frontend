import { Link } from "react-router-dom";
import {FaLaptop,FaDesktop,FaKeyboard,FaPuzzlePiece} from "react-icons/fa";
import { BsMouse } from "react-icons/bs";
import {FaTruck,FaShieldAlt,FaMoneyBillWave,FaCheckCircle} from "react-icons/fa";
import {FaFacebookF,FaInstagram,FaTiktok,FaWhatsapp} from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard.jsx";

export default function LandingPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios.get(
            import.meta.env.VITE_API_URL +
            "/products"
        )
        .then((response) => {

            setProducts(
                response.data.slice(0, 4)
            );

        })
        .catch((error) => {

            console.log(error);

        });

    }, []);

    return (
        <div className="w-full" >

            {/* Hero Section */}
            <section className="w-full min-h-screen bg-gradient-to-r from-secondary to-accent flex flex-col-reverse lg:flex-row items-center justify-between px-5 sm:px-8 lg:px-20 pt-20 sm:pt-24 lg:pt-20 pb-10 overflow-hidden">

                {/* Left Side */}
                <div className="max-w-[650px] text-white z-10 text-center lg:text-left">

                    <p className="text-dominant text-sm sm:text-lg mb-3 font-medium">
                        Welcome to BPC Computers
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">

                        Build Your <br className="sm:hidden" />

                        <span className="text-dominant">
                            Dream PC
                        </span>

                    </h1>

                    <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-[600px] mx-auto lg:mx-0">
                        Find high-performance laptops,
                        gaming PCs, accessories, and
                        premium computer components
                        at the best prices in Sri Lanka.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">

                        <Link
                            to="/products"
                            className="w-full sm:w-auto bg-white text-secondary px-6 py-3 rounded-full font-semibold text-sm sm:text-base">
                            Shop Now
                        </Link>

                        <Link
                            to="/about"
                        className="w-full sm:w-auto border-2 border-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base">
                            Learn More
                        </Link>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-10 text-center lg:text-left">

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                500+
                            </h1>

                            <p className="text-slate-300 text-sm sm:text-base">
                                Products
                            </p>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                1000+
                            </h1>

                            <p className="text-slate-300 text-sm sm:text-base">
                                Customers
                            </p>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                24/7
                            </h1>

                            <p className="text-slate-300 text-sm sm:text-base">
                                Support
                            </p>
                        </div>

                    </div>

                </div>

                {/* Right Side */}
                <div className="mb-8 lg:mb-0 relative flex justify-center items-center">

                    {/* Glow */}
                    <div className="absolute w-[190px] h-[220px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] bg-white/10 blur-[80px] rounded-full"></div>

                    <img
                        src="/gaming.png"
                        alt="gaming pc"
                        className="relative w-[190px] sm:w-[350px] lg:w-[600px] drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-[float_4s_ease-in-out_infinite]"
                    />

                </div>

            </section>

            {/* Category Section */}
{/* Category Section */}
<section className="w-full bg-gradient-to-b from-slate-100 to-slate-200 py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20">

    {/* Heading */}
    <div className="text-center mb-6 sm:mb-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-secondary">
            Shop By Category
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-lg max-w-[500px] mx-auto">
            Explore our premium collection of computer products
        </p>

    </div>

    {/* Category Cards */}
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1100px] mx-auto">

        {/* Laptop */}
        <Link
            to="/products"
            state={{ searchQuery: "laptop" }}
        >
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer group text-center h-full">

                <div className="mb-3 flex justify-center group-hover:scale-110 transition">
                    <FaLaptop className="text-4xl sm:text-5xl text-accent" />
                </div>

                <h1 className="text-lg sm:text-2xl font-bold text-secondary">
                    Laptops
                </h1>

                <p className="text-slate-500 mt-1 text-xs sm:text-base">
                    High performance laptops
                </p>

            </div>
        </Link>

        {/* Desktop */}
        <Link
            to="/products"
            state={{ searchQuery: "Desktop" }}
        >
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer group text-center h-full">

                <div className="mb-3 flex justify-center group-hover:scale-110 transition">
                    <FaDesktop className="text-4xl sm:text-5xl text-accent" />
                </div>

                <h1 className="text-lg sm:text-2xl font-bold text-secondary">
                    Desktops
                </h1>

                <p className="text-slate-500 mt-1 text-xs sm:text-base">
                    Powerful desktop systems
                </p>

            </div>
        </Link>

        {/* Components */}
        <Link
            to="/products"
            state={{ searchQuery: "ram" }}
        >
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer group text-center h-full">

                <div className="mb-3 flex justify-center group-hover:scale-110 transition">
                    <FaPuzzlePiece className="text-4xl sm:text-5xl text-accent" />
                </div>

                <h1 className="text-lg sm:text-2xl font-bold text-secondary">
                    Components
                </h1>

                <p className="text-slate-500 mt-1 text-xs sm:text-base">
                    RAM, SSD, GPU & more
                </p>

            </div>
        </Link>

        {/* Accessories */}
        <Link
            to="/products"
            state={{ searchQuery: "keyboard" }}
        >
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer group text-center h-full">

                <div className="mb-3 flex justify-center group-hover:scale-110 transition">
                    <FaKeyboard className="text-4xl sm:text-5xl text-accent" />
                </div>

                <h1 className="text-lg sm:text-2xl font-bold text-secondary">
                    Accessories
                </h1>

                <p className="text-slate-500 mt-1 text-xs sm:text-base">
                    Keyboard & Mouse
                </p>

            </div>
        </Link>

    </div>

</section>


        {/* Featured Products */}
        <section className="w-full bg-white py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20 overflow-hidden">

            {/* Heading */}
            <div className="text-center mb-8 sm:mb-12">

                <h1 className="text-3xl sm:text-4xl font-bold text-secondary leading-tight">
                    Featured Products
                </h1>

                <p className="text-slate-500 mt-2 text-sm sm:text-lg max-w-[500px] mx-auto">
                    Discover our best selling computer products
                </p>

            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 justify-items-center">

                {
                    products.map((product) => (
                        <div
                            key={product.productId}
                            className="w-full max-w-[300px]"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))
                }

            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-8 sm:mt-12">

                <Link
                    to="/products"
                    className="bg-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-accent transition duration-300 font-semibold text-sm sm:text-base"
                >
                    View All Products
                </Link>

            </div>

        </section>

            {/* Why Choose Us */}
        <section className="w-full bg-gradient-to-r from-secondary to-accent py-10 sm:py-14 lg:py-20 px-4 sm:px-8 lg:px-20 text-white">
        <section >

            {/* Heading */}
            <div className="text-center mb-8 sm:mb-12">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Why Choose BPC Computers?
                </h1>

                <p className="text-slate-200 mt-3 text-sm sm:text-lg max-w-[550px] mx-auto">
                    We provide quality products and excellent customer experience
                </p>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

                {/* Fast Delivery */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center hover:scale-105 hover:-translate-y-2 hover:bg-white/20 transition duration-300">

                    <FaTruck className="text-5xl sm:text-6xl text-dominant mx-auto mb-4" />

                    <h1 className="text-xl sm:text-2xl font-bold mb-2">
                        Fast Delivery
                    </h1>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        Quick and secure delivery across Sri Lanka.
                    </p>

                </div>

                {/* Genuine Products */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center hover:scale-105 hover:-translate-y-2 hover:bg-white/20 transition duration-300">

                    <FaCheckCircle className="text-5xl sm:text-6xl text-dominant mx-auto mb-4" />

                    <h1 className="text-xl sm:text-2xl font-bold mb-2">
                        Genuine Products
                    </h1>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        100% authentic and trusted computer products.
                    </p>

                </div>

                {/* Warranty */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center hover:scale-105 hover:-translate-y-2 hover:bg-white/20 transition duration-300">

                    <FaShieldAlt className="text-5xl sm:text-6xl text-dominant mx-auto mb-4" />

                    <h1 className="text-xl sm:text-2xl font-bold mb-2">
                        Warranty Support
                    </h1>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        Warranty available for selected products.
                    </p>

                </div>

                {/* Best Prices */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center hover:scale-105 hover:-translate-y-2 hover:bg-white/20 transition duration-300">

                    <FaMoneyBillWave className="text-5xl sm:text-6xl text-dominant mx-auto mb-4" />

                    <h1 className="text-xl sm:text-2xl font-bold mb-2">
                        Best Prices
                    </h1>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        Competitive prices with amazing deals.
                    </p>

                </div>

            </div>

        </section>


    <footer className="w-full bg-secondary text-white py-8 sm:py-12 px-5 sm:px-8 lg:px-20 rounded-t-[30px] mt-10">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

                {/* Brand */}
                <div className="text-center sm:text-left">

                    <img
                        src="logo.png"
                        alt="BPC Logo"
                        className="w-[110px] sm:w-[130px] mx-auto sm:mx-0 mb-4"
                    />

                    <p className="text-dominant/80 text-sm sm:text-base leading-relaxed">
                        BPC Computers provides premium laptops,
                        desktops, accessories, and computer
                        components at affordable prices.
                    </p>

                </div>

                {/* Quick Links */}
                <div className="text-center sm:text-left">

                    <h1 className="text-lg sm:text-xl font-bold mb-4">
                        Quick Links
                    </h1>

                    <div className="flex flex-col gap-2 text-dominant/80">

                        <Link
                            className="hover:text-accent transition"
                            to="/"
                        >
                            Home
                        </Link>

                        <Link
                            className="hover:text-accent transition"
                            to="/products"
                        >
                            Products
                        </Link>

                        <Link
                            className="hover:text-accent transition"
                            to="/about"
                        >
                            About
                        </Link>

                        <Link
                            className="hover:text-accent transition"
                            to="/contact"
                        >
                            Contact
                        </Link>

                    </div>

                </div>

                {/* Contact */}
                <div className="text-center sm:text-left">

                    <h1 className="text-lg sm:text-xl font-bold mb-4">
                        Contact Us
                    </h1>

                    <div className="flex flex-col gap-3 text-dominant/80 text-sm sm:text-base">

                        <p>📍 Colombo, Sri Lanka</p>
                        <p>📞 +94 71 712 5994</p>
                        <p className="break-all">
                            📧 pasindu613@gmail.com
                        </p>

                    </div>

                </div>

                {/* Social */}
                <div className="text-center sm:text-left">

                    <h1 className="text-lg sm:text-xl font-bold mb-4">
                        Follow Us
                    </h1>

                    <div className="flex justify-center sm:justify-start gap-3 text-lg sm:text-xl">

                        <a className="bg-accent p-2.5 rounded-full hover:scale-110 transition">
                            <FaFacebookF />
                        </a>

                        <a className="bg-accent p-2.5 rounded-full hover:scale-110 transition">
                            <FaInstagram />
                        </a>

                        <a className="bg-accent p-2.5 rounded-full hover:scale-110 transition">
                            <FaTiktok />
                        </a>

                        <a className="bg-accent p-2.5 rounded-full hover:scale-110 transition">
                            <FaWhatsapp />
                        </a>

                    </div>

                </div>

            </div>

            {/* Copyright */}
            <div className="border-t border-accent/30 mt-8 pt-5 text-center text-sm text-dominant/70">

                © 2026 BPC Computers. All Rights Reserved.

            </div>

    </footer>


</section>

        </div>
    );
}