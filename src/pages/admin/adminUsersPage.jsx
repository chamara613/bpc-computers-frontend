import axios from "axios";
import { useEffect, useState } from "react";
import getFormattedDate from "../../utils/date-format.js";
import toast from "react-hot-toast";

export default function AdminUsersPage() {

  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    setLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/user/all/${pageSize}/${pageNumber}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });

  }, [pageNumber, pageSize]);

  return (
    <div className="w-full max-h-full overflow-y-scroll p-6">

      <div className="w-full rounded-3xl bg-slate-100/80 p-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between sticky top-0 bg-white p-4 z-10 rounded-xl shadow">

          <div>
            <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
              Manage Users
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              View and manage all users
            </p>
          </div>

          <span className="bg-[var(--color-secondary)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Page {pageNumber} / {totalPages}
          </span>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="w-full h-60 flex items-center justify-center">
            <p className="text-lg font-semibold text-slate-600">
              Loading users...
            </p>
          </div>
        ) : (

          <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-[var(--color-secondary)] text-white">
  <tr className="text-left text-xs uppercase tracking-wider">
    <th className="px-6 py-4">Profile</th>
    <th className="px-6 py-4">Name</th>
    <th className="px-6 py-4">Email</th>
    <th className="px-6 py-4">Role</th>
    <th className="px-6 py-4">Joined Date</th>
    <th className="px-6 py-4">Action</th>
  </tr>
</thead>

<tbody className="divide-y divide-slate-200 bg-white">
  {users.map((user, index) => (
    <tr
      key={user._id || index}
      className="transition hover:bg-sky-50/60"
    >

      {/* Profile */}
      <td className="px-6 py-4">
        <img
          src={
            user.image ||
            "https://ui-avatars.com/api/?name=User"
          }
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border"
        />
      </td>

      {/* Name */}
      <td className="px-6 py-4 font-semibold text-slate-800">
        {user.firstName} {user.lastName}
      </td>

      {/* Email */}
      <td className="px-6 py-4 text-sm text-slate-700">
        {user.email}
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            user.role === "admin"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Joined Date */}
      <td className="px-6 py-4 text-sm text-slate-700">
        {user.createdAt
          ? getFormattedDate(user.createdAt)
          : "No Date"}
      </td>

      {/* Action */}
      <td className="px-6 py-4 flex gap-2">

  {/* Change Role Button */}
  <button
    className={`px-3 py-2 rounded-lg text-white text-sm ${
      user.role === "admin"
        ? "bg-orange-500 hover:bg-orange-600"
        : "bg-accent hover:bg-accent/80"
    }`}
    onClick={async () => {

      try {

        const token =
          localStorage.getItem("token");

        await axios.post(
          `${import.meta.env.VITE_API_URL}/user/update-role`,
          {
            email: user.email
          },
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        toast.success(
          "Role updated"
        );

        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.email === user.email
              ? {
                  ...u,
                  role:
                    u.role === "admin"
                      ? "customer"
                      : "admin"
                }
              : u
          )
        );

      } catch (error) {

        toast.error(
          error?.response?.data?.message
        );
      }
    }}
  >
    {user.role === "admin"
      ? "Make Customer"
      : "Make Admin"}
  </button>

  {/* Block / Unblock Button */}
  <button
    className={`px-3 py-2 rounded-lg text-white text-sm ${
      user.isBlocked
        ? "bg-green-500 hover:bg-green-600"
        : "bg-red-500 hover:bg-red-600"
    }`}
    onClick={async () => {

      try {

        const token =
          localStorage.getItem("token");

        await axios.post(
          `${import.meta.env.VITE_API_URL}/user/block-user`,
          {
            email: user.email
          },
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        toast.success(
          user.isBlocked
            ? "User unblocked"
            : "User blocked"
        );

        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.email === user.email
              ? {
                  ...u,
                  isBlocked:
                    !u.isBlocked
                }
              : u
          )
        );

      } catch (error) {

        toast.error(
          error?.response?.data?.message
        );
      }
    }}
  >
    {user.isBlocked
      ? "Unblock"
      : "Block"}
  </button>

</td>

    </tr>
  ))}
</tbody>
              </table>

            </div>

            {/* Pagination */}
            <div className="w-full h-[70px] flex justify-center items-center bg-white">

              <div className="w-[450px] h-full shadow-md rounded-full flex items-center justify-between px-4">

                {/* Previous */}
                <button
                  className="bg-accent text-white p-2 rounded-full cursor-pointer hover:bg-accent/80 w-[100px]"
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber(pageNumber - 1);
                    } else {
                      toast.success("You are on the first page");
                    }
                  }}
                >
                  Previous
                </button>

                {/* Page Info */}
                <span className="text-sm text-secondary w-[120px] text-center">
                  Page {pageNumber} of {totalPages}
                </span>

                {/* Next */}
                <button
                  className="bg-accent text-white p-2 rounded-full cursor-pointer hover:bg-accent/80 w-[100px]"
                  onClick={() => {
                    if (pageNumber < totalPages) {
                      setPageNumber(pageNumber + 1);
                    } else {
                      toast.success("You are on the last page");
                    }
                  }}
                >
                  Next
                </button>

                {/* Page Size */}
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value));
                    setPageNumber(1);
                  }}
                  className="border border-secondary/20 rounded px-3 py-2 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
} 