import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutDetailsModal(props){

    const [isVisible, setIsVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

        useEffect(
        ()=>{
            const token = localStorage.getItem("token")
   
            if(token == null){
                toast.error("Please login to continue checkout")
                navigate("/login")

            }
            
            axios.get(import.meta.env.VITE_API_URL+"/user/profile" ,{
                headers : {
                    Authorization : `Bearer ${token}`
                } 
            } ).then(
                (response) => {
                    console.log(response.data)
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)

                }
            ).catch(
                        ()=>{
                            localStorage.removeItem("token")
                            navigate("/login")
                        }
                    )
        },[]
    )


    const cart = props.cart;

    async function placeOrder() {  

        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("You must be logged in to place an order");
            navigate("/login");
            return;
        }

        const order = {
            firstName : firstName,
            lastName : lastName,
            addressLine1 : addressLine1,
            addressLine2 : addressLine2,
            city : city,
            postalCode : postalCode,
            phone : phone,

            items: [],

        }
        
        cart.forEach((item) => {
            order.items.push({
                productId: item.product.productId,
                qty: item.qty 
        })
        })
            console.log(order)
        try{
            await axios.post(import.meta.env.VITE_API_URL + "/orders" , order,{
                headers : {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Order placed successfully!");
            navigate("/my-orders");

        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to place the oreder. Please try again.");
            return;
        }

    }
    
return(
    <>
        <button
            className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-accent/80"
            onClick={()=>{
                setIsVisible(true);
            }}
        >
            Buy now
        </button>

        {
            isVisible &&

            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

                <div
                    className="bg-white w-full max-w-100
                    max-h-[90vh] overflow-y-auto
                    rounded-lg p-6 flex flex-col items-center"
                >

                    <h1 className="text-xl font-bold mb-5 text-secondary">
                        Checkout Details
                    </h1>

                    <input
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full h-10 border rounded-md p-2 mb-4"
                    />

                    <input
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full h-10 border rounded-md p-2 mb-4"
                    />

                    <input
                        value={addressLine1}
                        onChange={(e)=>setAddressLine1(e.target.value)}
                        placeholder="Address Line 1"
                        className="w-full h-10 border rounded-md p-2 mb-4"
                    />

                    <input
                        value={addressLine2}
                        onChange={(e)=>setAddressLine2(e.target.value)}
                        placeholder="Address Line 2"
                        className="w-full h-10 border rounded-md p-2 mb-4"
                    />

                    <input
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                        placeholder="City"
                        className="w-full h-10 border rounded-md p-2 mb-4"
                    />

                    <input
                        value={postalCode}
                        onChange={(e)=>setPostalCode(e.target.value)}
                        placeholder="Postal Code"
                        className="w-full h-10 border rounded-md p-2 mb-4"
                    />

                    <input
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full h-10 border rounded-md p-2 mb-5"
                    />

                    <div className="flex gap-3 w-full">

                        <button
                            onClick={()=>{
                                setIsVisible(false)
                            }}
                            className="w-1/2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={placeOrder}
                            className="w-1/2 bg-accent text-white px-4 py-2 rounded hover:bg-accent/80"
                        >
                            Confirm
                        </button>

                    </div>

                </div>

            </div>
        }
    </>
);
}