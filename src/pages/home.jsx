
import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productpage.jsx";
import OverView from "./overview.jsx";

export default function HomePage() {
    return(
        <div className="w-full h-full bg-dominant">
            <Header/>
            <Routes>
                <Route path="/" element={<div>Home page content</div>}/>
                <Route path="/about" element={<div>About page content</div>}/>
                <Route path="contact" element={<div>Contact page content</div>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/overview/:productId" element={<OverView/>}/>
                <Route path="/*" element={<div>404 Not Found</div>}/>
            </Routes>

        </div>
    )
}