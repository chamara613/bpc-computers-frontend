import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate,useLocation } from "react-router-dom";
import uploadFile  from "../../utils/mediaUpload.js";


export default function AdminUpdateProduct() {

    const location = useLocation();
    const [productId, setProductId] = useState(location.state?.productId || '');
    const [name, setName] = useState(location.state?.name || '');
    const [description, setDescription] = useState(location.state?.description || '');
    const [altNames, setAltNames] = useState(location.state?.altNames?.join(',') || '');
    const [price, setPrice] = useState(location.state?.price || '');
    const [labelledPrice, setLabelledPrice] = useState(location.state?.labelledPrice || ''); 
    const [category, setCategory] = useState(location.state?.category || '');
    const [brand, setBrand] = useState(location.state?.brand || '');
    const [model, setModel] = useState(location.state?.model || '');
    const [isVisible, setIsVisible] = useState(location.state?.isVisible || true);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    console.log(location);

    async function handleUpdateProduct() {

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

            let imageURLs =  await Promise.all(fileUploadPromises);

            if(imageURLs.length == 0){
                imageURLs = location.state.images
            }
            console.log(imageURLs);

            console.log("Files:", files);
            console.log("Files length:", files.length);

            await axios.put("http://localhost:3000/api/products/"+productId, {
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
            toast.success("Product Update successfully");
            navigate("/admin/adminProductsPage");
            
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add product");
            navigate('/admin/products');
}
    }

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll">
            
            <h1 className="w-full text-2xl font-bold mb-4 sticky top-0">Edit Product</h1>
            <div className="w-[50%] h-30 flex flex-col">
                <label className="font-bold ml-2">Product ID</label>
                <input disabled value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder="Ex: ID001" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
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
                <button onClick={handleUpdateProduct} className="bg-accent text-white px-4 py-2 rounded hover:bg-gray-300">Update Product</button>
                

            </div>
        
        </div>

    )
}
