import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { useAppContext } from "../../conext/AppContext";
import toast from "react-hot-toast";

const Rooms = () => {
    const { axios } = useAppContext();
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        const res = await axios.get("/api/admin/rooms");
        setRooms(res.data.rooms);
    };

    const deleteRoom = async (roomId) => {
        const res = await axios.delete(`/api/admin/rooms/${roomId}`);

        if (res.data.success) {
            toast.success("Room deleted");
            fetchRooms();
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <Title title="Rooms" subTitle="Manage hotel rooms" />

            {rooms.map((room) => (
                <div key={room._id} className="border p-4 rounded mt-4 flex justify-between">

                    <div>
                        <p className="font-semibold">{room.roomType}</p>
                        <p>{room.pricePerNight}</p>
                    </div>

                    <button
                        onClick={() => deleteRoom(room._id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded"
                    >
                        Delete
                    </button>

                </div>
            ))}
        </div>
    );
};

export default Rooms;