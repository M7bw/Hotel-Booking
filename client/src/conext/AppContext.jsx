import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const { user, isLoaded: userLoaded } = useUser();
    const { getToken, isLoaded: authLoaded, userId } = useAuth();

    const [isAdmin, setIsAdmin] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [authReady, setAuthReady] = useState(false);

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: backendUrl,
        });

        instance.interceptors.request.use(
            async (config) => {
                const token = await getToken();

                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        return instance;
    }, [backendUrl, getToken]);

    const fetchRooms = async () => {
        try {
            const { data } = await axiosInstance.get("/api/rooms");

            if (data.success) {
                setRooms(data.rooms || []);
            } else {
                toast.error(data.message || "Failed to fetch rooms");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const syncUser = async () => {
        try {
            if (!user || !authLoaded || !userLoaded) return;

            const token = await getToken();
            if (!token) return;

            const email = user?.emailAddresses?.[0]?.emailAddress || "";
            const username =
                `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
            const image = user?.imageUrl || "";

            const { data } = await axiosInstance.post("/api/user/sync", {
                username,
                email,
                image,
            });

            if (!data.success) {
                toast.error(data.message || "Failed to sync user");
                return;
            }

            setAuthReady(true);
        } catch (error) {
            setAuthReady(false);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const fetchUser = async () => {
        try {
            if (!authLoaded || !userLoaded || !userId) return;

            const { data } = await axiosInstance.get("/api/user");

            if (data.success) {
                setIsAdmin(data.role === "admin");
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities || []);
            } else {
                setIsAdmin(false);
                setIsOwner(false);
                setSearchedCities([]);
                toast.error(data.message || "Failed to fetch user");
            }
        } catch (error) {
            setIsAdmin(false);
            setIsOwner(false);
            setSearchedCities([]);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        const initUser = async () => {
            if (!authLoaded || !userLoaded) return;

            if (user && userId) {
                await syncUser();
            } else {
                setAuthReady(false);
                setIsAdmin(false);
                setIsOwner(false);
                setSearchedCities([]);
            }
        };

        initUser();
    }, [user, userId, authLoaded, userLoaded]);

    useEffect(() => {
        if (authReady) {
            fetchUser();
        }
    }, [authReady]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const value = {
        currency,
        navigate,
        user,
        userId,
        getToken,
        isOwner,
        setIsOwner,
        isAdmin,
        setIsAdmin,
        axios: axiosInstance,
        showHotelReg,
        setShowHotelReg,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms,
        authReady,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);