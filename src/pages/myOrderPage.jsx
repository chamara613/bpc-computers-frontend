import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomerViewOrderInfoModal from "../components/CustomerViewOrderInfoModel.jsx";
import getFormattedDate from "../utils/date-format.js";
import getFormattedPrice from "../utils/price-format.js";

export default function MyOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        setLoading(true);

        axios.get(
            `${import.meta.env.VITE_API_URL}/orders/${pageSize}/${pageNumber}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then((response) => {

            setOrders(response.data.orders);
            setTotalPages(response.data.totalPages);
            setLoading(false);

        })
        .catch((error) => {

            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders");
            setLoading(false);

        });

    }, [pageNumber, pageSize]);

    return(
        <div className="w-full min-h-screen p-3 sm:p-6">

            <div className="w-full rounded-3xl bg-slate-100/80 p-3 sm:p-6">

                {/* Header */}
                <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between sticky top-14 lg:top-25 bg-white p-4 rounded-xl z-10 shadow-sm">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary)]">
                            My Orders
                        </h1>

                        <p className="mt-1 text-sm text-slate-600">
                            View and manage your orders
                        </p>
                    </div>

                    <span className="bg-[var(--color-secondary)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow w-fit">
                        Page {pageNumber} / {totalPages}
                    </span>

                </div>

                {/* Loading */}
                {
                    loading ? (

                        <div className="w-full h-60 flex items-center justify-center">
                            <p className="text-lg font-semibold text-slate-600">
                                Loading orders...
                            </p>
                        </div>

                    ) : (

                        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">

                            {/* Table */}
                            <div className="overflow-x-auto w-full">

                                <table className="min-w-[900px] w-full">

                                    <thead className="bg-[var(--color-secondary)] text-white">

                                        <tr className="text-left text-xs uppercase tracking-wider">

                                            <th className="px-4 sm:px-6 py-4">
                                                Order ID
                                            </th>

                                            <th className="px-4 sm:px-6 py-4">
                                                Customer
                                            </th>

                                            <th className="px-4 sm:px-6 py-4">
                                                Date
                                            </th>

                                            <th className="px-4 sm:px-6 py-4">
                                                Email
                                            </th>

                                            <th className="px-4 sm:px-6 py-4">
                                                Total
                                            </th>

                                            <th className="px-4 sm:px-6 py-4">
                                                Status
                                            </th>

                                            <th className="px-4 sm:px-6 py-4">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-slate-200 bg-white">

                                        {
                                            orders.map((order) => {

                                                return(
                                                    <tr
                                                        key={order.orderId}
                                                        className="transition hover:bg-sky-50/60"
                                                    >

                                                        <td className="px-4 sm:px-6 py-4 font-semibold text-slate-800">
                                                            {order.orderId}
                                                        </td>

                                                        <td className="px-4 sm:px-6 py-4">
                                                            {order.firstName} {order.lastName}
                                                        </td>

                                                        <td className="px-4 sm:px-6 py-4 text-sm text-slate-700">
                                                            {getFormattedDate(order.date)}
                                                        </td>

                                                        <td className="px-4 sm:px-6 py-4 text-sm text-slate-700">
                                                            {order.email}
                                                        </td>

                                                        <td className="px-4 sm:px-6 py-4 font-semibold text-[var(--color-secondary)]">
                                                            {getFormattedPrice(order.total)}
                                                        </td>

                                                        <td className="px-4 sm:px-6 py-4">
                                                            <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                                {order.status}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 sm:px-6 py-4">
                                                            <CustomerViewOrderInfoModal
                                                                order={order}
                                                            />
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    )
                }

                {/* Pagination */}
                <div className="w-full flex justify-center items-center mt-5 mb-5 px-2">

                    <div className="w-full max-w-[450px] bg-white shadow-2xl rounded-2xl flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between p-4">

                        <button
                            className="bg-accent text-white p-2 rounded-full cursor-pointer hover:bg-accent/80 w-full sm:w-[100px]"
                            onClick={() => {

                                if(pageNumber > 1){

                                    setPageNumber(pageNumber - 1);
                                    setLoading(true);

                                }else{

                                    toast.success("You are on the first page");

                                }

                            }}
                        >
                            Previous
                        </button>

                        <span className="text-sm text-secondary text-center">
                            Page {pageNumber} of {totalPages}
                        </span>

                        <button
                            className="bg-accent text-white p-2 rounded-full cursor-pointer hover:bg-accent/80 w-full sm:w-[100px]"
                            onClick={() => {

                                if(pageNumber < totalPages){

                                    setPageNumber(pageNumber + 1);
                                    setLoading(true);

                                }else{

                                    toast.success("You are on the last page");

                                }

                            }}
                        >
                            Next
                        </button>

                        <select
                            value={pageSize}
                            onChange={(e) => {

                                setPageSize(parseInt(e.target.value));
                                setLoading(true);

                            }}
                            className="border border-secondary/20 rounded px-3 py-2 text-sm w-full sm:w-auto"
                        >
                            <option value={10}>
                                10 per page
                            </option>

                            <option value={20}>
                                20 per page
                            </option>

                            <option value={50}>
                                50 per page
                            </option>

                        </select>

                    </div>

                </div>

            </div>

        </div>
    )
}