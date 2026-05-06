import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutDetailsModal(props){

    const [isVisible, setIsVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const cart = props.cart;

    async function placeOrder() {  

        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("You must be logged in to plase an order");
            window.location.href = "/login";
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

        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to place the oreder. Please try again.");
            return;
        }

    }
    

    return(
        <>
             <button 
            className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-accent/80"
            onClick = {()=>{
                setIsVisible(true);
            }}
            >
                Buy now
            </button>
            {isVisible && <div className="w-full h-full bg-black/50 fixed justify-center items-centerz-50 top-0 left-0">
                <div className="bg-white w-[400px] h-auto rounded-lg p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" className="w-[300px] h-[40px] rounded-md p-2 mb-4"/>
                    <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" className="w-[300px] h-[40px] rounded-md p-2 mb-4"/>
                    <input value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)} placeholder="Address Line 1" className="w-[300px] h-[40px] rounded-md p-2 mb-4"/>
                    <input value={addressLine2} onChange={(e)=>setAddressLine2(e.target.value)} placeholder="Address Line 2" className="w-[300px] h-[40px] rounded-md p-2 mb-4"/>
                    <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City" className="w-[300px] h-[40px] rounded-md p-2 mb-4"/>
                    <input value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} placeholder="Postal Code" className="w-[300px] h-[40px] rounded-md p-2 mb-4"/>
                    <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone Number" className="w-[300px] h-[40px] rounded-md p-2 mb-4"/>
                    <button onClick={placeOrder} className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80">
                        Confirm
                    </button>
                </div>
            </div>}
        </>
    );
}