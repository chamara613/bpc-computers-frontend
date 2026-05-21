
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../components/productCard.jsx"
import LoadingAnimation from "../components/loadingAnimation.jsx"
import { useLocation } from "react-router-dom";

export default function ProductPage(){

    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    const location = useLocation();

    // get category from Link state
    useEffect(() => {
        if(location.state?.searchQuery){
            setSearchQuery(location.state.searchQuery);
            setLoading(true);
        }
    }, [location]);

    useEffect(() => {

        if(loading){

            let url = import.meta.env.VITE_API_URL + "/products/"

            if(searchQuery.trim() !== ""){
                url = import.meta.env.VITE_API_URL + "/products/search/" + searchQuery
            }

            axios.get(url)
            .then((response) => {
                setProduct(response.data)
                setLoading(false)
            })
            .catch(() => {
                toast.error("Failed to fetch products. please try again.")
                setLoading(false)
            })
        }

    }, [loading, searchQuery])

    return(
    <div className="w-full px-4 sm:px-6 md:px-8 pb-8 flex flex-wrap justify-center gap-4 sm:gap-5">

        {loading && <LoadingAnimation/>}

        {/* Search Bar */}
        <div className="w-full sticky top-[80px] z-10 backdrop-blur-sm py-3 flex flex-col sm:flex-row justify-center items-center gap-3 bg-dominant">

            <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-[400px] h-[45px] rounded-full border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setLoading(true);
                }}
            />

            <button
                className="w-full sm:w-auto px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                onClick={() => {
                    setSearchQuery("");
                    setLoading(true);
                }}
            >
                Get all products
            </button>

        </div>

        {/* Products */}
        <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-5 mt-2">

            {
                products.map((item) => (
                    <ProductCard
                        product={item}
                        key={item.productId}
                    />
                ))
            }

        </div>

    </div>
)
}