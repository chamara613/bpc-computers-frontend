
import axios from "axios";
import { useEffect, useState } from "react";
import getFormattedPrice from "../../utils/price-format.js";
import getFormattedDate from "../../utils/date-format.js";
import toast from "react-hot-toast";
import ViewOrderInfoModal from "../../components/viewOrderImfoModal.jsx";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/${pageSize}/${pageNumber}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [pageNumber, pageSize]);

  return (
    <div className="w-full max-h-full overflow-y-scroll p-6">
      <div className="w-full rounded-3xl bg-slate-100/80 p-6">
        <div className="mb-6 flex items-center justify-between sticky top-0 bg-white p-4 z-10">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
              Manage Orders
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              View and manage customer orders
            </p>
          </div>

          <span className="bg-[var(--color-secondary)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Page {pageNumber} / {totalPages}
          </span>
        </div>

        {loading ? (
          <div className="w-full h-60 flex items-center justify-center">
            <p className="text-lg font-semibold text-slate-600">Loading orders...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[var(--color-secondary)] text-white">
                  <tr className="text-left text-xs uppercase tracking-wider">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                    
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order.orderId} className="transition hover:bg-sky-50/60">
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {order.orderId}
                      </td>

                      <td className="px-6 py-4">
                        {order.firstName} {order.lastName}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {getFormattedDate(order.date)}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {order.email}
                      </td>

                      <td className="px-6 py-4 font-semibold text-[var(--color-secondary)]">
                        {getFormattedPrice(order.total)}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                          {order.status}
                        </span>
                      </td>

                        <td className="px-6 py-4">
                            <ViewOrderInfoModal order = {order}/>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full h-[50px] absolute bottom-5 left-0 flex justify-center items-center">
                <div className="w-[400px] h-full bg-white shadow-2xl rounded-full flex items-center justify-between px-2">
                    <button className="bg-accent text-white p-2 rounded-full cursor-pointer hover:bg-accent/80 w-[100px]"
                    onClick={() => {
                      if(pageNumber > 1){
                        setPageNumber(pageNumber - 1);
                        setLoading(true);
                      }else
                      {
                        toast.success("You are on the first page")
                      }
                    }}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-secondary w-[100px] text-center">
                        page {pageNumber} of {totalPages}
                    </span>
                    <button className="bg-accent text-white p-2 rounded-full cursor-pointer hover:bg-accent/80 w-[100px]"
                      onClick={
                        ()=>{
                          if(pageNumber < totalPages){
                            setPageNumber(pageNumber + 1);
                            setLoading(true);
                          }else{
                            toast.success("You are on the last page")
                          }
                        }
                      }
                    >
                        Next
                    </button>

                    <select
                        value={pageSize}
                        onChange={(e)=>{
                            setPageSize(parseInt(e.target.value));
                            setLoading(true);
                        }}
                        className="ml-5 border-secondary/20 rounded px-3 py-2 text-sm"
                    >
                        {/* <option value={5}>5 per page</option> */}
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </select>


                </div>



            </div>
          </div>
        )}
      </div>
    </div>
  );
}