import TopBar from "../components/TopBar";

import {
  FaUserShield,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  };

  const infoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
    color: "#475569",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <TopBar />

      <div
        style={{
          padding: "40px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        {/* WELCOME */}
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              color: "#1e293b",
              marginBottom: "10px",
            }}
          >
            Welcome back, {user.name}
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Manage your account and system
            information from here.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div style={cardStyle}>
          <h2
            style={{
              marginBottom: "25px",
              color: "#334155",
            }}
          >
            Profile Information
          </h2>

          <div style={infoStyle}>
            <FaUserShield />
            <span>
              <strong>Role:</strong>{" "}
              {user.role}
            </span>
          </div>

          <div style={infoStyle}>
            <FaEnvelope />
            <span>
              <strong>Email:</strong>{" "}
              {user.email}
            </span>
          </div>

          <div style={infoStyle}>
            <FaPhone />
            <span>
              <strong>Phone:</strong>{" "}
              {user.phone}
            </span>
          </div>

          <div style={infoStyle}>
            <FaMapMarkerAlt />
            <span>
              <strong>Address:</strong>{" "}
              {user.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;