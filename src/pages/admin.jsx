import { Link } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage.jsx";
import { Route, Routes } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import AdminAddProduct from "./admin/adminAddProduct.jsx";  

export default function Admin() {
    return(
        
        <div className="w-full h-screen bg-accent flex">
         
            <div className="w-75 h-full flex flex-col bg-accent">
                <h1 className="text-3xl font-bold text-center p-5">Admin Panel</h1>
                <hr className="border-2 border-secondary w-full mb-5"/>
                
                <Link className="flex w-full p-2.5 gap-3 items-center hover:bg-white hover:text-accent" to = "/admin/orders"><FaRegListAlt /> Orders</Link>
                <Link className="flex w-full p-2.5 gap-3 items-center hover:bg-white hover:text-accent" to = "/admin/adminProductsPage"><MdOutlineProductionQuantityLimits />Products</Link>
                <Link className="flex w-full p-2.5 gap-3 items-center hover:bg-white hover:text-accent" to = "/admin/users"><LuUsersRound /> Users</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full p-4 rounded-2xl bg-white border-8 border-accent">
           
                <Routes>
                    <Route path="/orders" element={<h1>Orders page fuck you</h1>} />
                    <Route path="/adminProductsPage" element={<AdminProductsPage />} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/add-product" element={<AdminAddProduct />} />
                </Routes>
            </div>
        
        </div>
        
    )
}