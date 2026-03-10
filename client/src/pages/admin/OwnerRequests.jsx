import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { useAppContext } from "../../conext/AppContext";
import toast from "react-hot-toast";

const OwnerRequests = () => {
    const { axios } = useAppContext();
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await axios.get("/api/admin/owner-requests");

            if (res.data.success) {
                setRequests(res.data.requests);
            }
        } catch (error) {
            toast.error(error.message);
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
            }
        } catch (error) {
            toast.error(error.message);
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
            }
        } catch (error) {
            toast.error(error.message);
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

            {requests.map((req) => (
                <div key={req._id} className="border p-4 rounded-lg mt-4">

                    <p className="font-medium">{req.username}</p>
                    <p>{req.email}</p>

                    <div className="flex gap-2 mt-3">

                        <button
                            onClick={() => approve(req._id)}
                            className="bg-green-100 text-green-600 px-3 py-1 rounded"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => reject(req._id)}
                            className="bg-red-100 text-red-600 px-3 py-1 rounded"
                        >
                            Reject
                        </button>

                    </div>

                </div>
            ))}
        </div>
    );
};

export default OwnerRequests;