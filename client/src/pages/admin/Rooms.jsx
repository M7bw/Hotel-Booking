import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { useAppContext } from "../../conext/AppContext";
import toast from "react-hot-toast";

const Rooms = () => {
    const { axios } = useAppContext();
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get("/api/admin/rooms");

            if (data.success) {
                setRooms(data.rooms || []);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const deleteRoom = async (roomId) => {
        try {
            const { data } = await axios.delete(`/api/admin/rooms/${roomId}`);

            if (data.success) {
                toast.success(data.message);
                fetchRooms();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <Title
                align="left"
                title="Rooms"
                subTitle="See all rooms and who owns them"
            />

            <div className="border rounded-lg mt-6 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Room</th>
                            <th className="p-3">Hotel</th>
                            <th className="p-3">Owner</th>
                            <th className="p-3">Owner Email</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room._id} className="border-t">
                                <td className="p-3">{room.roomType || "-"}</td>
                                <td className="p-3">{room.hotel?.name || "-"}</td>
                                <td className="p-3">{room.hotel?.owner?.username || "-"}</td>
                                <td className="p-3">{room.hotel?.owner?.email || "-"}</td>
                                <td className="p-3">{room.pricePerNight || 0}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => deleteRoom(room._id)}
                                        className="bg-red-100 text-red-600 px-3 py-1 rounded cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Rooms;