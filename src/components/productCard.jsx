import getFormattedPrice from "../utils/price-format.js";
import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const product = props.product;

    return (
        <Link
            to={`/overview/${product.productId}`}
            className="w-full max-w-[320px] rounded-2xl shadow-lg bg-white overflow-hidden hover:shadow-2xl transition duration-300 group"
        >

            {/* Image Section */}
            <div className="relative w-full h-[200px] sm:h-[240px] overflow-hidden">

                {/* Second Image */}
                {
                    product.images?.[1] &&
                    <img
                        src={product.images[1]}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                }

                {/* Main Image */}
                <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="main-image absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 z-10 bg-white"
                />

            </div>

            {/* Product Details */}
            <div className="p-4">

                <span className="text-sm text-slate-400">
                    {product.productId}
                </span>

                <h1 className="font-semibold text-lg text-secondary mt-1 line-clamp-2 min-h-[56px]">
                    {product.name}
                </h1>

                {
                    product.labelledPrice > product.price &&
                    <p className="text-sm text-red-500 line-through opacity-70 mt-1">
                        {getFormattedPrice(product.labelledPrice)}
                    </p>
                }

                <p className="text-xl font-bold text-black mt-1">
                    {getFormattedPrice(product.price)}
                </p>

            </div>

        </Link>
    );
}