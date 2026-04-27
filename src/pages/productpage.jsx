import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../components/productCard.jsx"

export default function ProductPage(){
    const [products, setProduct]= useState([])
    const [loading,setLoading] = useState(true)

    useEffect(
        ()=>{
            if(loading){
                axios.get(import.meta.env.VITE_API_URL + "/products")
                .then(
                    (response)=>{
                        setProduct(response.data)
                        setLoading(false)
                    }
                ) .catch(
                    ()=>{
                        toast.error("Failed to fetch products. please try again.")
                        setLoading(false)
                    }
                )
            }
        }
    )

    return(
        <div className="w-full min-h-screen flex items-center justify-center flex-wrap">
            {
                products.map(
                    (item)=>{
                        return(
                            <ProductCard product = {item} key = {item.productId}/>

                        )
                    }
                )
            }
        </div>
    )
}