import { Link } from "react-router-dom";
import {FaLaptop,FaUsers,FaAward,FaHeadset} from "react-icons/fa";
export default function AboutPage() {

    return (
        <div className="w-full min-h-screen bg-dominant">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary to-accent text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-20 text-center">

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                    About BPC Computers
                </h1>

                <p className="mt-5 text-sm sm:text-lg lg:text-xl text-dominant/90 max-w-[700px] mx-auto">
                    Your trusted destination for
                    laptops, gaming PCs, accessories,
                    and premium computer components.
                </p>

            </section>

            {/* Our Story */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left */}
                    <div className="text-center lg:text-left">

                        <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                            Our Story
                        </h1>

                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                            BPC Computers was founded
                            with a passion for technology
                            and a mission to provide
                            high-quality computer products
                            at affordable prices.

                            We specialize in laptops,
                            gaming PCs, computer accessories,
                            and premium components for
                            students, professionals,
                            gamers, and businesses.
                        </p>

                    </div>

                    {/* Right */}
                    <div className="flex justify-center">

                        <img
                            src="/gaming.png"
                            alt="About"
                            className="w-[280px] sm:w-[400px] lg:w-[550px]"
                        />

                    </div>

                </div>

            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20">

                <div className="text-center mb-10 lg:mb-14">

                    <h1 className="text-3xl sm:text-4xl font-bold text-secondary">
                        Why Choose Us
                    </h1>

                    <p className="text-slate-500 mt-3 text-sm sm:text-base">
                        What makes BPC Computers special
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                    <div className="bg-dominant rounded-3xl p-6 sm:p-8 text-center shadow-md hover:-translate-y-2 transition">

                        <FaLaptop className="text-4xl sm:text-5xl text-accent mx-auto mb-4" />

                        <h1 className="text-lg sm:text-xl font-bold mb-3">
                            Premium Products
                        </h1>

                        <p className="text-slate-500 text-sm sm:text-base">
                            High quality laptops
                            and accessories.
                        </p>

                    </div>

                    <div className="bg-dominant rounded-3xl p-6 sm:p-8 text-center shadow-md hover:-translate-y-2 transition">

                        <FaUsers className="text-4xl sm:text-5xl text-accent mx-auto mb-4" />

                        <h1 className="text-lg sm:text-xl font-bold mb-3">
                            Trusted Customers
                        </h1>

                        <p className="text-slate-500 text-sm sm:text-base">
                            Thousands of happy
                            customers.
                        </p>

                    </div>

                    <div className="bg-dominant rounded-3xl p-6 sm:p-8 text-center shadow-md hover:-translate-y-2 transition">

                        <FaAward className="text-4xl sm:text-5xl text-accent mx-auto mb-4" />

                        <h1 className="text-lg sm:text-xl font-bold mb-3">
                            Quality Guaranteed
                        </h1>

                        <p className="text-slate-500 text-sm sm:text-base">
                            Genuine and trusted
                            products only.
                        </p>

                    </div>

                    <div className="bg-dominant rounded-3xl p-6 sm:p-8 text-center shadow-md hover:-translate-y-2 transition">

                        <FaHeadset className="text-4xl sm:text-5xl text-accent mx-auto mb-4" />

                        <h1 className="text-lg sm:text-xl font-bold mb-3">
                            24/7 Support
                        </h1>

                        <p className="text-slate-500 text-sm sm:text-base">
                            Fast customer
                            support anytime.
                        </p>

                    </div>

                </div>

            </section>

            {/* Stats */}
            <section className="bg-secondary text-white py-12 sm:py-16 lg:py-20">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center px-4">

                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            500+
                        </h1>

                        <p className="mt-2 text-sm sm:text-base">
                            Products
                        </p>
                    </div>

                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            1000+
                        </h1>

                        <p className="mt-2 text-sm sm:text-base">
                            Customers
                        </p>
                    </div>

                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            5+
                        </h1>

                        <p className="mt-2 text-sm sm:text-base">
                            Years Experience
                        </p>
                    </div>

                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            24/7
                        </h1>

                        <p className="mt-2 text-sm sm:text-base">
                            Support
                        </p>
                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="py-12 sm:py-16 lg:py-20 text-center px-4">

                <h1 className="text-3xl sm:text-4xl font-bold text-secondary">
                    Ready To Shop?
                </h1>

                <p className="text-slate-500 mt-3 mb-8 text-sm sm:text-base">
                    Explore our latest products today
                </p>

                <Link
                    to="/products"
                    className="inline-block bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-secondary transition"
                >
                    Browse Products
                </Link>

            </section>

        </div>
    );
}