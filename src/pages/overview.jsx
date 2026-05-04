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
    

    // console.log(params.productId); // test
    
    useEffect(()=>{
        axios.get(import.meta.env.VITE_API_URL+"/products/"+params.productId)
        .then((response)=>{
            setProduct(response.data)
        }).catch((error)=>{
            toast.error("Failed to fetch product details. please try again.")
        })
    },[])   
        
         

    return(
        <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
            {
                product == null ? <LoadingAnimation /> : 
                <div className="w-full h-full flex col">
                    <div className="w-[50%] h-full ">
                        <ImageSlideShow images={product.images}/>
                        

                    </div> 
                    {/* <div className="w-[50%] h-full flex flex-col">

                        <h1 className="text-3xl font-bold text-[var(--color-secondary)]">{product.name}
                        {
                            product.altNames.map(
                                (altName,index)=>{
                                    return(
                                        <span key={index} className="text-sm text-gray-500">| {altName}</span>
                                    )
                                } 
                            )  
                        }
                        </h1>
                        {
                            <p className="text-lg font-medium mb-2">
                                <span>{product.brand || ""}</span>
                                <span> - </span>                            
                                <span>{product.model || ""}</span>
                            </p>
                        }
                        
                        <p className="text-2xl font-bold text-[var(--color-primary)]">
                            {getFormattedPrice(product.price)}
                        </p>
                        {
                            product.labelledPrice && 
                            <p className="text-sm mb-4">
                                <span className="font-bold">Labelled Price:</span> {getFormattedPrice(product.labelledPrice)}
                            </p>
                        }
                        <p className="text-md">{product.description || ""}</p>
                        
                        <div className="w-full h-25 flex items-center justify-start">
                            <button className="bg-blue-600 ml-4 mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--color-secondary)]">
                                Add to Cart
                            </button>
                            <button className="ml-4 mt-6 rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[var(--color-secondary)]">
                                buy now
                            </button>
                            
                        </div>

                    </div> */}
                    <div className="w-[50%] h-full flex flex-col justify-center px-10">

                    <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                        {product.category || "Product"}
                    </p>

                    <h1 className="mt-2 text-4xl font-bold leading-tight text-secondary">
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
                        <p className="text-4xl font-extrabold text-accent">
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

                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-700">
                        {product.description || ""}
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                        <button className="rounded-xl border-2 border-accent px-6 py-3 text-sm font-semibold text-accent shadow-sm transition hover:bg-accent hover:text-white" onClick={
                            () => {
                                addToCart  (product, +1)
                                toast.success(product.name + " added to cart!")

                            }

                        }>
                        Add to Cart
                        </button>

                        <Link to="/checkout" state={
                            [
                                {
                                    product:{
                                        name: product.name,
                                        price: product.price,
                                        labelledPrice: product.labelledPrice,
                                        image: product.images[0],
                                        productId:  product.productId

                                    },
                                    qty: 1,
                                },
                            ]
                        } className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-secondary"
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