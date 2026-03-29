import { useState } from "react";

export default function AdminAddProduct() {
    const [productId, setProductId] = useState('');
    const [Name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [altName, setAltName] = useState('');
    const [price, setPrice] = useState('');
    const [labelledPrice, setLabelledPrice] = useState(''); 
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    return(
        <div className="w-full max-h-full flex flex-wrap items-start">
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Product ID</label>
                <input value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder="Ex: ID001" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Name</label>
                <input value={Name} onChange={(e)=>{setName(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>  
            <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold ml-2">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>  
            <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold ml-2">Alternative Name</label>
                <input value={altName} onChange={(e)=>{setAltName(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>  
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Price</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Labelled Price</label>
                <input value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} placeholder="Ex: Laptop" className="p-2 m-2 border-2 border-accent rounded gap-4"/>
            </div>
            <div className="w-[25%] h-[120px] flex flex-col">
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
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="font-bold ml-2">Brand</label>
            <select value={brand} onChange={(e)=>{setBrand(e.target.value)}} className="p-2 m-2 border-2 border-accent rounded gap-4">
                <option value="">Select a brand</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Apple">Apple</option>
            </select>
            </div>
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="font-bold ml-2">Model</label>
            <select value={model} onChange={(e)=>{setModel(e.target.value)}} className="p-2 m-2 border-2 border-accent rounded gap-4">
                <option value="">Select a model</option>
                <option value="XPS 13">XPS 13</option>
                <option value="Spectre x360">Spectre x360</option>
                <option value="ThinkPad X1">ThinkPad X1</option>
                <option value="MacBook Air">MacBook Air</option>
            </select>
            </div>
            <div className="w-[25%] h-[120px] flex flex-col">
            <label className="font-bold ml-2">Visible</label>
            <select value={isVisible} onChange={(e)=>{setIsVisible(e.target.value)}} className="p-2 m-2 border-2 border-accent rounded gap-4">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            </div>
        
        </div>

    )
}
