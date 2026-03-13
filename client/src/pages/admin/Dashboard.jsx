import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { useAppContext } from "../../conext/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
    const { axios } = useAppContext();
    const [data, setData] = useState({});

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/admin/dashboard");
            if (res.data.success) {
                setData(res.data.dashboardData);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Title
                align="left"
                title="Admin Dashboard"
                subTitle="Platform overview"
            />

            <div className="grid grid-cols-5 gap-4 my-8">
                <div>Total Owners: {data.totalOwners}</div>
                <div>Total Hotels: {data.totalHotels}</div>
                <div>Total Rooms: {data.totalRooms}</div>
                <div>Total Bookings: {data.totalBookings}</div>
                <div>Total Revenue: {data.totalRevenue} $</div>
            </div>
        </div>
    );
};

export default Dashboard;