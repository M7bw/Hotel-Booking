import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { useAppContext } from "../../conext/AppContext";
import toast from "react-hot-toast";

const Users = () => {
    const { axios } = useAppContext();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/api/admin/users");

            if (res.data.success) {
                setUsers(res.data.users);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const toggleBlock = async (userId) => {
        try {
            const res = await axios.post("/api/admin/users/toggle-block", { userId });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeRole = async (userId, role) => {
        try {
            const res = await axios.post("/api/admin/users/change-role", {
                userId,
                role,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <Title
                align="left"
                title="Users Management"
                subTitle="Manage users, roles and access"
            />

            <div className="border rounded-lg mt-6 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>

                                <td className="p-3 flex gap-2 justify-center">

                                    <button
                                        onClick={() =>
                                            changeRole(
                                                user._id,
                                                user.role === "hotelOwner" ? "user" : "hotelOwner"
                                            )
                                        }
                                        className="bg-blue-100 px-3 py-1 rounded text-blue-600 text-xs"
                                    >
                                        Change Role
                                    </button>

                                    <button
                                        onClick={() => toggleBlock(user._id)}
                                        className="bg-red-100 px-3 py-1 rounded text-red-600 text-xs"
                                    >
                                        Block
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

export default Users;