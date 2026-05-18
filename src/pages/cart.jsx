
import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart.js";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-format.js";

export default function Cart(){

    const [cart, setCart] = useState(getCart());

    return(
        //<div className="w-full min-h-screen flex overflow-y-auto">
        //<div className="w-full p-4 sm:p-6 md:p-8 flex flex-wrap justify-center gap-5 overflow-y-auto">
        <div className="w-full min-h-screen flex">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-4 sm:p-5">

                {
                    cart.map((cartItem, index)=>{

                        return(
                            <div
                                key={index}
                                className="w-full max-w-[600px] min-h-[150px]
                                flex flex-col sm:flex-row
                                rounded-lg overflow-hidden shadow bg-white"
                            >

                                {/* Product Image */}
                                <img
                                    src={cartItem.product.image}
                                    alt={cartItem.product.name}
                                    className="w-full sm:w-[150px] h-[200px] sm:h-[150px] object-cover p-2"
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

                                    {/* Quantity Buttons */}
                                    <div className="w-[210px] h-[40px] border rounded-full overflow-hidden flex mt-3">

                                        <button
                                            onClick={()=>{
                                                addToCart(cartItem.product, -1)
                                                setCart(getCart());
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
                                                addToCart(cartItem.product, 1)
                                                setCart(getCart());
                                            }}
                                            className="w-[70px] h-full flex justify-center items-center text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                                        >
                                            <BiPlus/>
                                        </button>

                                    </div>
                                </div>

                                {/* Price Section */}
                                <div className="w-full sm:w-[170px] flex sm:flex-col justify-between sm:justify-center items-start sm:items-end p-4 border-t sm:border-t-0">

                                    <div>
                                        {
                                            cartItem.product.labelledPrice >
                                            cartItem.product.price && (

                                                <span className="text-sm text-gray-700 line-through block">
                                                    {getFormattedPrice(cartItem.product.labelledPrice)}
                                                </span>
                                            )
                                        }

                                        <span className="text-sm text-secondary font-semibold block">
                                            {getFormattedPrice(cartItem.product.price)}
                                        </span>
                                    </div>

                                    <span className="text-lg text-secondary font-bold">
                                        {getFormattedPrice(
                                            cartItem.product.price * cartItem.qty
                                        )}
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
                    rounded-b-xl shadow flex flex-col sm:flex-row
                    items-center justify-between p-4 gap-4"
                >

                    <Link
                        state={cart}
                        to="/Checkout"
                        className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80"
                    >
                        Checkout
                    </Link>

                    <span className="text-lg sm:text-xl font-bold text-secondary border-4 py-2 px-4 border-double">
                        {getFormattedPrice(getCartTotal(cart))}
                    </span>

                </div>

            </div>

        </div>
    )
}