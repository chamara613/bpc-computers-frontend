import getFormattedPrice from "../utils/price-format.js"
import { Link } from "react-router-dom";

export default function ProductCard(props){
    const product = props.product
    return(
        <Link to={`/overview/${product.productId}`} className="w-87.5 h-100 m-4 p-4 rounded-lg shadow-lg bg-white overflow-hidden hover:[&_.main-image]:opacity-0 relative ">
            
            <div className="bg-white absolute top-0 left-0 w-full">
            <img src ={product.images[1]} alt={product.images} className="h-62.5 object-cover"/>
            </div>
            <div className="bg-white main-image absolute top-0 left-0 transition-opacity duration-500">
            <img src ={product.images[0]} alt={product.images} className="h-62.5 object-cover"/>
            </div>
            <div className="h-37.5 w-full absolute bottom-0 flex border justify-center flex-col p-2">
                <span className="font-xs opacity-50">{product.productId}</span>
                <span className="font-semibold text-lg">{product.name}</span> 
                {
                    product.labelledPrice > product.price &&
                    <p className="text-sm text-red-600 line-through opacity-60">{getFormattedPrice(product.labelledPrice)}</p>
                }
                <p className="text-lg font-bold">{getFormattedPrice(product.price)}</p>
               
            </div>



        </Link>
    )
}