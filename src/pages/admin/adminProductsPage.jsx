
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
    return(
        <div className="w-full h-full">
            <Link to="/admin/add-product" className="bg-accent text-white w-12.5 h-12.5 flex items-center justify-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-12 right-16">
                <FaPlus />
            </Link>

        </div>
    )
}   