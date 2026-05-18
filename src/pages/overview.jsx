
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation.jsx";
import ImageSlideShow from "../components/imageSlideShow.jsx";
import getFormattedPrice from "../utils/price-format.js";
import { addToCart } from "../utils/cart.js";
import { Link } from "react-router-dom";

export default function OverView(){

    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_API_URL+"/products/"+params.productId)
        .then((response)=>{
            setProduct(response.data)
        }).catch((error)=>{
            toast.error("Failed to fetch product details. please try again.")
        })
    },[])

    return(
        // <div className="w-full min-h-screen flex items-center justify-center p-4">
        <div className="w-full p-4 sm:p-6 md:p-8 flex flex-wrap justify-center gap-5">  

            {
                product == null ? <LoadingAnimation /> :

                <div className="w-full min-h-full flex flex-col lg:flex-row gap-8">

                    {/* Left Side Image */}
                    <div className="w-full lg:w-[50%] h-auto">
                        <ImageSlideShow images={product.images}/>
                    </div>

                    {/* Right Side Details */}
                    <div className="w-full lg:w-[50%] flex flex-col justify-center px-2 sm:px-6 lg:px-10">

                        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                            {product.category || "Product"}
                        </p>

                        <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-secondary">
                            {product.name}
                        </h1>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {product.altNames?.map((altName, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                                >
                                    {altName}
                                </span>
                            ))}
                        </div>

                        <p className="mt-4 text-base font-medium text-slate-600">
                            <span>{product.brand || "Generic"}</span>
                            <span className="mx-2 text-slate-400">|</span>
                            <span>{product.model || "Standard"}</span>
                        </p>

                        <div className="mt-6">
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-accent">
                                {getFormattedPrice(product.price)}
                            </p>

                            {product.labelledPrice && (
                                <p className="mt-2 text-sm text-slate-500">
                                    <span className="line-through">
                                        {getFormattedPrice(product.labelledPrice)}
                                    </span>

                                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                        Save {getFormattedPrice(product.labelledPrice - product.price)}
                                    </span>
                                </p>
                            )}
                        </div>

                        <p className="mt-6 text-base leading-7 text-slate-700">
                            {product.description || ""}
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">

                            <button
                                className="w-full sm:w-auto rounded-xl border-2 border-accent px-6 py-3 text-sm font-semibold text-accent shadow-sm transition hover:bg-accent hover:text-white"
                                onClick={() => {
                                    addToCart(product, +1)
                                    toast.success(product.name + " added to cart!")
                                }}
                            >
                                Add to Cart
                            </button>

                            <Link
                                to="/checkout"
                                state={[
                                    {
                                        product:{
                                            name: product.name,
                                            price: product.price,
                                            labelledPrice: product.labelledPrice,
                                            image: product.images[0],
                                            productId: product.productId
                                        },
                                        qty: 1,
                                    },
                                ]}
                                className="w-full sm:w-auto text-center rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-secondary"
                            >
                                Buy Now
                            </Link>

                        </div>

                    </div>

                </div>
            }

        </div>
    )
}