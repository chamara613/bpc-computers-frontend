import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewOrderInfoModal(props) {


    const [isVisible, setIsVisible] = useState(false);
    const order = props.order;
    const [status , setStatus] = useState(order.status)
    const [notes, setNotes] = useState(order.notes || "")
    const onUpdate = props.onUpdate;

    async function handleChenge() {
        try{
            const token = localStorage.getItem("token")
            await axios.put(import.meta.env.VITE_API_URL+"/orders/"+order.orderId,{
                status : status,
                notes : notes
            }, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })

            toast.success("Order updated successfully")
            setIsVisible(false)
            if (typeof onUpdate === "function") {
                onUpdate();
            }

        }catch{
            toast.error("Failed to update order")
        }
        
    }

    return (
        <>
            <button
                className="bg-accent text-white px-3 py-1 rounded hover:bg-accent/80"
                onClick={() => setIsVisible(true)}
            >
                View Details
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="w-[700px] h-[650px] bg-white rounded-xl overflow-hidden shadow-2xl relative">

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white text-2xl z-50 cursor-pointer"
                            onClick={() => setIsVisible(false)}
                        >
                            ✕
                        </button>

                        {/* Header */}
                        <div className="w-full bg-accent p-6">

                            <h1 className="text-2xl font-bold text-white">
                                {order.orderId}
                            </h1>

                            <h2 className="text-sm text-white/80 mt-1">
                                {getFormattedDate(order.date)}
                            </h2>

                        <div className="mt-5 flex gap-6 items-start">

                            {/* Left Side */}
                            <div className="flex-1">

                                <div>
                                    <h1 className="text-lg font-semibold text-white">
                                        {order.firstName + " " + order.lastName}
                                    </h1>

                                    <h2 className="text-sm text-white/80">
                                        {order.email}
                                    </h2>
                                </div>

                                <div className="mt-5">
                                    <h1 className="text-2xl font-bold text-white">
                                        {getFormattedPrice(order.total)}
                                    </h1>

                                    <div className="flex items-center gap-3 mt-2">

                                        <span className="bg-white text-accent px-3 py-1 rounded-full text-xs font-semibold">
                                            {order.status}
                                        </span>

                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="bg-white text-black rounded-lg px-2 py-1"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>

                                    </div>
                                </div>

                            </div>

                        {/* Right Side Notes */}
                            <div className="w-[300px] bg-slate-100 rounded-xl p-4">

                                <h1 className="text-lg font-semibold text-secondary mb-2">
                                    Notes
                                </h1>

                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add order notes..."
                                    className="w-full h-[100px] rounded-lg p-3 border border-slate-300 outline-none resize-none text-black bg-white"
                                />

                            </div>

                        </div>
                        </div>

                        {/* Items Section */}
                        <div className="w-full h-[450px] overflow-y-auto p-5">

                            <h1 className="text-xl font-bold text-secondary mb-5">
                                Ordered Items
                            </h1>

                            {
                                order.items?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="w-full flex items-center justify-between border border-slate-200 rounded-xl p-4 mb-4 hover:shadow-md transition"
                                        >

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-lg border"
                                                />

                                                <div>
                                                    <h1 className="font-semibold text-lg">
                                                        {item.name}
                                                    </h1>

                                                    <p className="text-sm text-slate-500">
                                                        Product ID : {item.productId}
                                                    </p>

                                                    <p className="text-sm text-slate-500">
                                                        Quantity : {item.qty}
                                                    </p>
                                                </div>

                                            </div>

                                            <div className="text-right">

                                                <h1 className="text-lg font-bold text-accent">
                                                    {getFormattedPrice(item.price)}
                                                </h1>

                                                <p className="text-sm text-slate-500">
                                                    Total :
                                                    {" "}
                                                    {getFormattedPrice(item.price * item.qty)}
                                                </p>

                                            </div>

                                        </div>
                                    );
                                })
                            }

                        </div>{
                        (order.status != status || order.notes != notes) && (
                        <button 
                            onClick={handleChenge}
                            className="bottom-5 right-5 absolute bg-accent text-white rounded-lg">
                            Save chenges
                        </button>
                        )
                        }
                    </div>

                </div>
            )}
        </>
    );
}