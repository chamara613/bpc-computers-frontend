import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteModal(props){
    const [isVisible, setIsVisible] = useState(false)
    const product = props.product;
    const setLoading = props.setLoading;

    return(
        <div>
            <CiTrash onClick={()=>{setIsVisible(true)}} lassName="hover:text-red-500 cursor-pointer"/>
            {
                isVisible && (
                    <div className="fixed z-100 bg-black/50 w-screen h-screen top-0 left-0 flex justify-center items-center">
                        <div className="w-100 bg-white h-50 relative">
                            <button onClick={()=>{setIsVisible(false)}} className="w-10 h-10  text-red-600 absolute right-0 text-sm font-bold hover:bg-red-600 hover:text-white cursor-pointer">X</button>
                            <h1 className="text-lg font-semibold text-center mt-10">Are you sure you want to delete this product whit product ID {product.productId}?</h1>
                            {/* Buttons */}
                        <div className="flex justify-center text-sm gap-4">

                            {/* Cancel Button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold"
                            >
                                Cancel
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={
                                    ()=>{
                                        const token = localStorage.getItem("token");
                                        axios.delete(import.meta.env.VITE_API_URL + "/products/"+product.productId,{
                                            headers:{
                                            Authorization: "Bearer "+token
                                            }
                                        }).then(
                                            ()=>{                                                
                                            setIsVisible(false);
                                            toast.success("Product deleted successfully");
                                            setLoading(true);
                                            }
                                        ).catch(
                                            (err)=>{
                                            toast.error(err?.response?.data?.message || "Failed to delect product");
                                            }
                                        )
                                    }
                                }
                                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
                            >
                                Delete
                            </button>

                        </div>

                        </div>

                    </div>
                )
            }
        </div>
    )
}