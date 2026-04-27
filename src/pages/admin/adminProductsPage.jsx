
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getFormattedPrice from "../../utils/price-format.js";
import LoadingAnimation from "../../components/loadingAnimation.jsx";
import axios from "axios";
import { RiEdit2Line } from "react-icons/ri";
import { CiTrash } from "react-icons/ci";
import toast from "react-hot-toast";
import DeleteModal from "../../components/deleteModal.jsx";


const  sampleProductsList = [
];

export default function AdminProductsPage() {
    const [products, setProducts] = useState(sampleProductsList);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      if(loading){
        const token = localStorage.getItem("token");

        axios
        .get(import.meta.env.VITE_API_URL + "/products", {
            headers: {
                Authorization: "Bearer " + token
            },
        })
        .then((response) => {
            setProducts(response.data);
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });

      }
    
    },[loading])

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll">

        <div className=" w-full rounded-3xl bg-slate-100/80 p-6">
          
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

        
        {loading ? (
          <div className="w-full h-full overflow-y-scroll">
            <LoadingAnimation/>

          </div>
        ) : (
          <table className="min-w-[1100px] w-full text-sm relative">
            ...
          </table>
        )}

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
                  <th className="px-6 py-4">Actions</th>
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
                    <span>{getFormattedPrice(item.labelledPrice)}</span>
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
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center text-2xl gap-2">
                    <Link
                        to="/admin/update-product"
                        state={item}
                        className="hover:text-accent"
                    ><RiEdit2Line />
                    </Link>
                      <DeleteModal product={item} setLoading={setLoading}/>
                    </div>
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