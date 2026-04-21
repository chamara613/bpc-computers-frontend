
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getFormattedPrice from "../../utils/price-format.js";
import axios from "axios";

const  sampleProductsList = [
    {
    productId: "P001",
    name: "Dell Inspiron 15 Laptop",
    description: "15.6-inch laptop with Intel Core i5 processor, 8GB RAM, and 512GB SSD.",
    altNames: ["Dell Laptop", "Inspiron 15", "Dell i5 Laptop"],
    price: 185000,
    laballedprice: 195000,
    category: "Laptops",
    isVisible: true
  }
];

export default function AdminProductsPage() {
    const [products, setProducts] = useState(sampleProductsList);
    useEffect(()=>{
        const token = localStorage.getItem("token");

        axios
        .get(import.meta.env.VITE_API_URL + "/products", {
            headers: {
                Authorization: "Bearer " + token
            },
        })
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
    },[])

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll">

  <div className="rounded-3xl bg-slate-100/80 p-6">
    
    <div className="mb-6 flex items-center justify-between sticky top-0 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
          Product Management
        </h1>

        <span className="bg-[var(--color-secondary)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {products.length} items
        </span>
        <p className="mt-1 text-sm text-slate-600">
          View and manage all products easily
        </p>
      </div>

      <Link to="/admin/add-product" className="rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[var(--color-secondary)]">
        + Add Product
      </Link>
    </div>

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[var(--color-secondary)] text-white">
            <tr className="text-left text-xs uppercase tracking-wider">
              <th className="px-6 py-4">ProductID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Labelled Price</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Visibility</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {products.map((item) => (
              <tr key={item.productId} className="transition hover:bg-sky-50/60">
                
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-800">{item.productId}</p>
                    
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    
                  </div>
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  <span>{getFormattedPrice(item.price)}</span>
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-[var(--color-secondary)]">
                  <span>{getFormattedPrice(item.laballedprice)}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    {item.category}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <img
                    src={item.images[0] || "https://via.placeholder.com/80x80?text=Product"}
                    //alt={item.name}
                    className="h-14 w-14 rounded-xl border border-slate-200 object-cover shadow-sm"
                  />
                {/* </td>
                <td className="px-6 py-4">
                <div className="flex gap-2">
                    {item.images?.length > 0 ? (
                    item.images.map((img, index) => (
                         <img
                        key={index}
                        src={img}
                        className="h-14 w-14 rounded-xl border border-slate-200 object-cover shadow-sm"
                        />
                    ))
                    ) : (
                    <img
                         src="https://via.placeholder.com/80x80?text=Product"
                        className="h-14 w-14 rounded-xl border border-slate-200 object-cover shadow-sm"
                    />
                    )}
                </div> */}
                </td>

                 <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    {item.brand || "N/A"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      item.isVisible
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {item.isVisible ? "Visible" : "Hidden"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>


        </div>
    )
}   