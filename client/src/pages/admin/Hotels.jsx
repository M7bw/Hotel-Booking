import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { useAppContext } from "../../conext/AppContext";
import toast from "react-hot-toast";

const Hotels = () => {
    const { axios } = useAppContext();
    const [hotels, setHotels] = useState([]);

    const fetchHotels = async () => {
        const res = await axios.get("/api/admin/hotels");
        setHotels(res.data.hotels);
    };

    const deleteHotel = async (hotelId) => {
        const res = await axios.delete(`/api/admin/hotels/${hotelId}`);

        if (res.data.success) {
            toast.success("Hotel deleted");
            fetchHotels();
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    return (
        <div>
            <Title title="Hotels" subTitle="Manage platform hotels" />

            {hotels.map((hotel) => (
                <div key={hotel._id} className="border p-4 rounded mt-4 flex justify-between">

                    <div>
                        <p className="font-semibold">{hotel.name}</p>
                        <p>{hotel.city}</p>
                    </div>

                    <button
                        onClick={() => deleteHotel(hotel._id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded"
                    >
                        Delete
                    </button>

                </div>
            ))}
        </div>
    );
};

export default Hotels;