import {FaMapMarkerAlt,FaPhoneAlt,FaEnvelope} from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function ContactPage() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    function sendEmail(e) {

        e.preventDefault();

        emailjs.send(
            "service_1z3p935", // your service ID
            "template_fz5pwij", // replace with template ID
            formData,
            "gQkW8tzNwS6kbNB6N" // replace with public key
        )
        .then(() => {

            toast.success("Message Sent Successfully!");

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        })
        .catch((error) => {

            console.log(error);
            toast.error("Failed to send message");

        });
    }

    return (
        <div className="w-full min-h-screen bg-dominant">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary to-accent text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-8 text-center">

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                    Contact Us
                </h1>

                <p className="mt-5 text-sm sm:text-base lg:text-lg text-dominant/90 max-w-[700px] mx-auto">
                    Have questions? Need help?
                    We’re here to assist you.
                </p>

            </section>

            {/* Contact Info + Form */}
            <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Contact Info */}
                    <div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-8 text-center lg:text-left">
                            Get In Touch
                        </h1>

                        <div className="space-y-5">

                            <div className="flex items-center gap-4 bg-white p-4 sm:p-5 rounded-3xl shadow-md">

                                <FaMapMarkerAlt className="text-accent text-2xl sm:text-3xl" />

                                <div>
                                    <h2 className="font-bold text-base sm:text-lg">
                                        Address
                                    </h2>

                                    <p className="text-slate-500 text-sm sm:text-base">
                                        Colombo, Sri Lanka
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4 bg-white p-4 sm:p-5 rounded-3xl shadow-md">

                                <FaPhoneAlt className="text-accent text-2xl sm:text-3xl" />

                                <div>
                                    <h2 className="font-bold text-base sm:text-lg">
                                        Phone
                                    </h2>

                                    <p className="text-slate-500 text-sm sm:text-base">
                                        +94 71 712 5993
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4 bg-white p-4 sm:p-5 rounded-3xl shadow-md">

                                <FaEnvelope className="text-accent text-2xl sm:text-3xl" />

                                <div>
                                    <h2 className="font-bold text-base sm:text-lg">
                                        Email
                                    </h2>

                                    <p className="text-slate-500 text-sm sm:text-base break-all">
                                        pasinduc613@gmail.com
                                    </p>
                                </div>

                            </div>

                            {/* Map */}
                            <div className="bg-white p-2 rounded-3xl shadow-md overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6660.4588403894695!2d79.90471357819261!3d6.970021881380269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2599250f53c1d%3A0x646e6fe43eca56f3!2sFaculty%20of%20Computing%20and%20Technology%20-%20University%20of%20Kelaniya!5e0!3m2!1sen!2slk!4v1779207588862!5m2!1sen!2slk"
                                    width="100%"
                                    height="300"
                                    loading="lazy"
                                    className="border-0 rounded-2xl"
                                ></iframe>
                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md">

                        <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-6 text-center lg:text-left">
                            Send Message
                        </h1>

                        <form
                            onSubmit={sendEmail}
                            className="space-y-4 sm:space-y-5"
                        >

                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 sm:p-4 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                                required
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 sm:p-4 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                                required
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full p-3 sm:p-4 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                                value={formData.subject}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        subject: e.target.value
                                    })
                                }
                            />

                            <textarea
                                rows="5"
                                placeholder="Your Message"
                                className="w-full p-3 sm:p-4 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value
                                    })
                                }
                                required
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-accent text-white py-3 sm:py-4 rounded-xl hover:bg-secondary transition"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>

        </div>
    );
}