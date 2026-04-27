import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile  from "../../utils/mediaUpload.js";

export default function AdminAddProduct() {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [altNames, setAltNames] = useState('');
    const [price, setPrice] = useState('');
    const [labelledPrice, setLabelledPrice] = useState(''); 
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    async function handleAddProduct() {

        try{
            const token = localStorage.getItem('token');
            console.log(token);
            
            if(token === null) {
                toast.error('You must be logged in to add a product');
                window.location.href = '/login';
                return;
            }

            const fileUploadPromises = [];

            for(let i=0; i<files.length; i++){
                fileUploadPromises[i]= uploadFile(files[i]);
                
            }

            const imageURLs =  await Promise.all(fileUploadPromises);
           
            

            await axios.post("http://localhost:3000/api/products", {
                productId: productId,
                name: name,
                description: description,
                price: price,
                labelledPrice: labelledPrice,
                altNames: altNames.split(','),
                images: imageURLs,
                category: category,
                brand: brand,
                model: model,
                isVisible: isVisible
            },{
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product added successfully");
            navigate("/admin/adminProductsPage");
            
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add product");
            navigate('/admin/products');
}
    }

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll">
            
            <h1 className="w-full text-2xl font-bold mb-4 sticky top-0">Add New Product</h1>
            <div className="w-[50%] h-30 flex flex-col">
                <label className="font-bold ml-2">Product ID</label>
                <input value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder="Ex: ID001" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>
            <div className="w-[50%] h-30 flex flex-col">
                <label className="font-bold ml-2">Name</label>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>  
            <div className="w-full h-30 flex flex-col">
                <label className="font-bold ml-2">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>  
            <div className="w-full h-30 flex flex-col">
                <label className="font-bold ml-2">Images</label>
                <input multiple type="file" onChange={(e)=>{setFiles(e.target.files)}} className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>
            <div className="w-full h-30 flex flex-col">
                <label className="font-bold ml-2">Alternative Name</label>
                <input value={altNames} onChange={(e)=>{setAltNames(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>  
            <div className="w-[50%] h-30 flex flex-col">
                <label className="font-bold ml-2">Price</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>
            <div className="w-[50%] h-30 flex flex-col">
                <label className="font-bold ml-2">Labelled Price</label>
                <input value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>
            <div className="w-[25%] h-30 flex flex-col">
            <label className="font-bold ml-2">Category</label>
            <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="p-2 m-2 border-2 border-accent rounded gap-4">
                <option value="">other</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="Components">Components</option>
                <option value="accessories">Accessories</option>
                <option value="peripherals">Peripherals</option>
            </select>
            </div>
            <div className="w-30 flex flex-col">
            <label className="font-bold ml-2">Brand</label>
            <select value={brand} onChange={(e)=>{setBrand(e.target.value)}} className="p-2 m-2 border-2 border-accent rounded gap-4">
                <option value="">Select a brand</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Apple">Apple</option>
            </select>
            </div>
            <div className="w-[25%] h-30 flex flex-col">
            <label className="font-bold ml-2">Model</label>
            <select value={model} onChange={(e)=>{setModel(e.target.value)}} className="p-2 m-2 border-2 border-accent rounded gap-4">
                <option value="">Select a model</option>
                <option value="XPS 13">XPS 13</option>
                <option value="Spectre x360">Spectre x360</option>
                <option value="ThinkPad X1">ThinkPad X1</option>
                <option value="MacBook Air">MacBook Air</option>
            </select>
            </div>
            <div className="w-[25%] h-30 flex flex-col">
            <label className="font-bold ml-2">Visible</label>
            <select value={isVisible} onChange={(e)=>{setIsVisible(e.target.value)}} className="p-2 m-2 border-2 border-accent rounded gap-4">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            </div>
            <div className="bg-white w-full h-20 sticky bottom-0 flex rounded-bottom-2xl items-center justify-end p-4 gap-4">
                <button 
                    onClick={() => navigate("/admin/adminProductsPage")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2">Cancel</button>
                <button onClick={handleAddProduct} className="bg-accent text-white px-4 py-2 rounded hover:bg-gray-300">Add Product</button>
                

            </div>
        
        </div>

    )
}
