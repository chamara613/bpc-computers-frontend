import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart.js";
import { BiMinus } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import {Link} from "react-router-dom"
import getFormattedPrice from "../utils/price-format.js"


export default function Cart(){
    const [cart, setCart] = useState(getCart());

    return(
        <div className="w-full h-[calc(100vh-100px)] flex overflow-y-scroll">
            <div className="w-full  flex justify-center items-center flex-col gap-4 p-5">
            {
                cart.map((cartItem, index)=>{
                    return(
                        <div key={index} className="w-[600px] h-[150px] flex rounded-lg overflow-hidden shadow">
                            <img src={cartItem.product.image} alt={cartItem.product.name} className="h-[150px] aspect-square object-cover"/>
                            <div className="h-full w-[330px] p-4 flex flex-col overflow-hidden justify-between">
                                <p className="text-lg font-bold">{cartItem.product.productId}</p>
                                <h1 className="text-2xl font-bold text-[var(--color-secondary)]">{cartItem.product.name}</h1>
                                <div className="w-[210px] h-[40px] border rounded-full overflow-hidden flex">
                                    <button onClick={
                                        ()=>{
                                            addToCart(cartItem.product, -1)
                                            setCart(getCart());

                                        }
                                    } className="w-[70px] h-full flex justify-center items-center text-sm font-semibold text-gray-700 transition hover:bg-gray-200">
                                        <BiMinus/>
                                    </button>
                                    <span className="w-[70px] h-full flex justify-center items-center text-sm font-semibold text-gray-700">
                                       {cartItem.qty} 
                                    </span>
                                    <button onClick={
                                        ()=>{
                                            addToCart(cartItem.product, 1)
                                            setCart(getCart());
                                        }
                                    } className="w-[70px] h-full flex justify-center items-center text-sm font-semibold text-gray-700 transition hover:bg-gray-200">
                                        <BiPlus/>
                                    </button>

                                </div>
                            </div>
                            <div className="w-[170px] h-full flex flex-col justify-center items-end p-4">
                                {
                                    cartItem.product.labelledPrice>cartItem.product.price &&(
                                        <span className="text-sm text-gray-700 line-through">{getFormattedPrice(cartItem.product.labelledPrice)}</span>
                                    )
                                }
                                <span className="text-sm text-secondary font-semibold">{getFormattedPrice(cartItem.product.price)}</span>
                                <span className="text-lg text-secondary font-bold">{getFormattedPrice(cartItem.product.price * cartItem.qty)}</span>

                            </div>

                        </div>
                    )
                }  
                )     
            
            }
            <div className="bg-white  w-[600px] h-[100px] sticky bottom-0 rounded-b-xl shadow flex items-center">
                {/* //<span className="text-lg font-bold text-secondary absolute left-5">Total</span> */}
              
                <Link  state={cart} to="/Checkout" className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-accent/80">Checkout</Link>
                <span className="text-xl font-bold text-secondary absolute right-5 border-4 py-6 border-double">{getFormattedPrice(getCartTotal(cart))}</span>

            </div>
            </div>


            
        </div>
    )
}