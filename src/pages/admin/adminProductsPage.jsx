
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
    return(
        <div className="w-full h-full overflow-y-scroll">
            <Link to="/admin/add-product" className="bg-accent text-white w-[50px] h-[50px] flex items-center justify-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-12 right-16">
                <FaPlus />
            </Link>

        </div>
    )
}   