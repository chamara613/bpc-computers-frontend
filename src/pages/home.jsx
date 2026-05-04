
import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productpage.jsx";
import OverView from "./overview.jsx";
import Cart from "./cart.jsx";
import Checkout from "./checkout.jsx"
import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";    

export default function HomePage() {
    return(
        <div className="w-full h-full bg-dominant ">

            <Header/>
            <Routes>
                <Route path="/" element={<div>Home page content</div>}/>
                <Route path="/about" element={<div>About page content</div>}/>
                <Route path="/contact" element={<div>Contact page content</div>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/overview/:productId" element={<OverView/>}/>
                <Route path="/Checkout" element={<Checkout/>}/>
                <Route path="/*" element={<div>404 Not Found</div>}/>
            </Routes>
                <Link to="/cart"><BiShoppingBag size={30} className="text-2xl"/> cart</Link>
            

        </div>
    )
}