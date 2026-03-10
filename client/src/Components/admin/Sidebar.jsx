import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {

    const links = [
        { name: "Dashboard", path: "/admin", icon: assets.dashboardIcon },
        { name: "Users", path: "/admin/users", icon: assets.listIcon },
        { name: "Hotels", path: "/admin/hotels", icon: assets.addIcon },
        { name: "Rooms", path: "/admin/rooms", icon: assets.listIcon },
    ];

    return (
        <div className="w-64 border-r h-full pt-4">

            {links.map((item, index) => (

                <NavLink
                    key={index}
                    to={item.path}
                    end={item.path === "/admin"}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 ${isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                    }
                >
                    <img src={item.icon} className="h-5" />
                    {item.name}
                </NavLink>

            ))}

        </div>
    );
};

export default Sidebar;