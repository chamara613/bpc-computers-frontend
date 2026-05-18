
import { useState } from "react";
import { getCartTotal } from "../utils/cart.js";
import { BiMinus, BiPlus } from "react-icons/bi";
import getFormattedPrice from "../utils/price-format.js";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutDetailsModal from "../components/checkOutDetailsModal.jsx";

export default function Checkout(){

    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);
    const navigate = useNavigate();

    if(location.state == null){
        navigate("/products");
        return null;
    }

    return(
        //<div className="w-full min-h-screen flex overflow-y-auto">
        <div className="w-full  p-4 sm:p-6 md:p-8 flex flex-wrap justify-center gap-5">
        

            <div className="w-full flex justify-center items-center sd:items-start flex-col gap-4 p-4 sm:p-5">

                {
                    cart.map((cartItem, index)=>{

                        return(
                            <div
                                key={index}
                                className="w-full max-w-[600px]
                                min-h-[150px]
                                flex flex-col sm:flex-row
                                rounded-lg overflow-hidden
                                shadow bg-white"
                            >

                                {/* Product Image */}
                                <img
                                    src={cartItem.product.image}
                                    alt={cartItem.product.name}
                                    className="w-full sm:w-[150px]
                                    h-[220px] sm:h-[150px]
                                    object-contain bg-white p-2"
                                />

                                {/* Product Details */}
                                <div className="flex-1 p-4 flex flex-col justify-between">

                                    <div>
                                        <p className="text-sm sm:text-lg font-bold">
                                            {cartItem.product.productId}
                                        </p>

                                        <h1 className="text-lg sm:text-2xl font-bold text-[var(--color-secondary)]">
                                            {cartItem.product.name}
                                        </h1>
                                    </div>

                                    {/* Quantity */}
                                    <div className="w-[210px] h-[40px] border rounded-full overflow-hidden flex mt-3">

                                        <button
                                            onClick={()=>{
                                                const newCart = [...cart]
                                                newCart[index].qty =
                                                newCart[index].qty - 1

                                                if(newCart[index].qty <= 0){
                                                    newCart.splice(index,1)
                                                }

                                                setCart(newCart)
                                            }}
                                            className="w-[70px] h-full flex justify-center items-center text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                                        >
                                            <BiMinus/>
                                        </button>

                                        <span className="w-[70px] h-full flex justify-center items-center text-sm font-semibold text-gray-700">
                                            {cartItem.qty}
                                        </span>

                                        <button
                                            onClick={()=>{
                                                const newCart = [...cart]
                                                newCart[index].qty =
                                                newCart[index].qty + 1

                                                setCart(newCart)
                                            }}
                                            className="w-[70px] h-full flex justify-center items-center text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                                        >
                                            <BiPlus/>
                                        </button>

                                    </div>
                                </div>

                                {/* Price */}
                                <div className="w-full sm:w-[170px]
                                flex sm:flex-col justify-between
                                sm:justify-center items-start
                                sm:items-end p-4 border-t sm:border-t-0">

                                    <div>
                                        {
                                            cartItem.product.labelledPrice >
                                            cartItem.product.price && (

                                                <span className="text-sm text-gray-700 line-through block">
                                                    {getFormattedPrice(
                                                        cartItem.product.labelledPrice
                                                    )}
                                                </span>
                                            )
                                        }

                                        <span className="text-sm text-secondary font-semibold block">
                                            {getFormattedPrice(
                                                cartItem.product.price
                                            )}
                                        </span>
                                    </div>

                                    <span className="text-lg text-secondary font-bold">
                                        {
                                            getFormattedPrice(
                                                cartItem.product.price *
                                                cartItem.qty
                                            )
                                        }
                                    </span>

                                </div>

                            </div>
                        )
                    })
                }

                {/* Total Section */}
                <div
                    className="bg-white w-full max-w-[600px]
                    min-h-[100px] sticky bottom-0
                    rounded-b-xl shadow flex
                    flex-col sm:flex-row
                    items-center justify-between
                    p-4 gap-4"
                >

                    <CheckoutDetailsModal cart={cart} />

                    <span
                        className="text-lg sm:text-xl
                        font-bold text-secondary
                        border-4 py-2 px-4
                        border-double"
                    >
                        {getFormattedPrice(getCartTotal(cart))}
                    </span>

                </div>

            </div>

        </div>
    )
}