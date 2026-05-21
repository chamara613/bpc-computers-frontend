
import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productpage.jsx";
import OverView from "./overview.jsx";
import Cart from "./cart.jsx";
import Checkout from "./checkout.jsx"
import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";    
import MyOrdersPage from "./myOrderPage.jsx";
import SettingsPage from "./settings.jsx";
import LandingPage from "./landingPage.jsx";
import AboutPage from "./about.jsx";
import ContactPage from "./contact.jsx";


export default function HomePage() {
    return(
        //<div className="w-full min-h-full bg-dominant relative">
        <div className="w-full min-h-screen bg-dominant pt-16 lg:pt-20">

            <Header/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/overview/:productId" element={<OverView/>}/>
                <Route path="/Checkout" element={<Checkout/>}/>
                <Route path="/*" element={<div>404 Not Found</div>}/>
                <Route path="/my-orders" element ={<MyOrdersPage/>}/>
                <Route path="/settings" element = {<SettingsPage/>}/>
            </Routes>
          
            

        </div>
    )
}