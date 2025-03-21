import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ expanded }) => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: "fas fa-chart-pie", text: "Dashboard" },
    { to: "/kyc", icon: "fas fa-id-card", text: "KYC" },
    { to: "/orders", icon: "fa-solid fa-cart-shopping", text: "Orders" },
    { to: "/settings", icon: "fas fa-gear", text: "Settings" },
  ];

  return (
    <div
      className={`flex flex-col bg-gray-100 text-black border-r border-gray-300 z-20 ${
        expanded ? "w-64" : "w-20"
      } transition-width duration-300 ease-in-out`}
      style={{
        height: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Logo Section */}
      <div className="logo p-4 flex items-center border-b border-gray-300 mb-4">
        <div className="w-8 h-8 bg-green-500 rounded-full flex justify-center items-center">
          <div className="text-xl text-gray-100">⚡</div>
        </div>
        <span
          className={`logo-text ml-2 font-semibold text-lg transition-opacity duration-200 ${
            expanded ? "opacity-100" : "opacity-0"
          } ${!expanded && "hidden"}`}
        >
          Eco Wheels
        </span>
      </div>

      {/* Menu Items */}
      <ul className="nav flex-col mt-2 w-full p-0">
        {navItems.map((item) => (
          <li key={item.to} className="nav-item m-0 p-0 mb-1">
            <Link
              to={item.to}
              className={`nav-link flex items-center text-black py-2 px-4 hover:bg-gray-200 transition-colors duration-200 ${
                location.pathname === item.to ? "bg-gray-200 border-l-4 border-green-500" : ""
              }`}
              style={{
                justifyContent: "flex-start",
              }}
            >
              <i
                className={`${item.icon} text-xl`}
                style={{
                  width: "30px",
                  minWidth: "30px",
                  textAlign: "center",
                  fontSize: "1.25rem", // Adjusted icon size to match example better
                }}
              ></i>
              <span
                className={`ml-3 font-medium transition-opacity duration-200 ${
                  expanded ? "opacity-100" : "opacity-0"
                } ${!expanded && "hidden"}`}
                style={{
                  fontSize: "1rem",
                  overflow: 'hidden',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Section */}
      <div className="mt-auto p-4">
        <Link
          to="/login"
          className="nav-link flex items-center text-black py-2 px-4 hover:bg-gray-200 transition-colors duration-200"
          style={{
            justifyContent: "flex-start",
          }}
        >
          <i
            className="fas fa-sign-out-alt text-xl"
            style={{
              width: "30px",
              minWidth: "30px",
              textAlign: "center",
              fontSize: "1.25rem", // Adjusted icon size to match example better
            }}
          ></i>
          <span
            className={`ml-3 font-medium transition-opacity duration-200 ${
              expanded ? "opacity-100" : "opacity-0"
            } ${!expanded && "hidden"}`}
            style={{
              fontSize: "1rem",
              overflow: 'hidden',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            Logout
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;