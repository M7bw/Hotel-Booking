import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { useAppContext } from "../../conext/AppContext";
import toast from "react-hot-toast";

const OwnerRequests = () => {
    const { axios } = useAppContext();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/admin/owner-requests");

            if (res.data.success) {
                setRequests(res.data.requests);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const approve = async (userId) => {
        try {
            const res = await axios.post("/api/admin/owner-requests/approve", {
                userId,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchRequests();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const reject = async (userId) => {
        try {
            const res = await axios.post("/api/admin/owner-requests/reject", {
                userId,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchRequests();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
            <Title
                align="left"
                title="Owner Requests"
                subTitle="Approve or reject hotel owner applications"
            />

            {loading ? (
                <p className="mt-6">Loading...</p>
            ) : requests.length === 0 ? (
                <p className="mt-6 text-gray-500">No pending owner requests.</p>
            ) : (
                <div className="space-y-4 mt-6">
                    {requests.map((req) => (
                        <div key={req._id} className="border p-4 rounded-lg">
                            <p className="font-semibold">{req.username}</p>
                            <p className="text-sm text-gray-600">{req.email}</p>

                            <div className="mt-3 text-sm text-gray-700 space-y-1">
                                <p>
                                    <span className="font-medium">Hotel Name:</span>{" "}
                                    {req.requestedHotelData?.name || "-"}
                                </p>
                                <p>
                                    <span className="font-medium">Address:</span>{" "}
                                    {req.requestedHotelData?.address || "-"}
                                </p>
                                <p>
                                    <span className="font-medium">Contact:</span>{" "}
                                    {req.requestedHotelData?.contact || "-"}
                                </p>
                                <p>
                                    <span className="font-medium">City:</span>{" "}
                                    {req.requestedHotelData?.city || "-"}
                                </p>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => approve(req._id)}
                                    className="bg-green-100 text-green-600 px-4 py-2 rounded cursor-pointer"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() => reject(req._id)}
                                    className="bg-red-100 text-red-600 px-4 py-2 rounded cursor-pointer"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerRequests;