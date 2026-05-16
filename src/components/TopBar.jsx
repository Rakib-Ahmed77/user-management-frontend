import { Link, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBell,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function TopBar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const linkStyle = {
    color: "#475569",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontWeight: "500",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        background: "#f8f5f0",
        padding: "18px 35px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <Link to="/dashboard" style={linkStyle}>
          <FaHome />
          Dashboard
        </Link>

        {user.role === "admin" && (
          <Link to="/users" style={linkStyle}>
            <FaUsers />
            Users
          </Link>
        )}

        {user.role === "admin" && (
          <Link
            to="/notifications"
            style={linkStyle}
          >
            <FaBell />
            Notifications
          </Link>
        )}

        <Link to="/my-profile" style={linkStyle}>
          <FaUser />
          My Profile
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <button
        onClick={logoutUser}
        style={{
          background: "#334155",
          color: "white",
          border: "none",
          padding: "9px 16px",
          borderRadius: "7px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          fontWeight: "500",
        }}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default TopBar;