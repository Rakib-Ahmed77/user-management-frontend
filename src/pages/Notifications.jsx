import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../components/TopBar";

import { FaBell } from "react-icons/fa";

function Notifications() {
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setNotifications(res.data);
    } catch {
      alert("Failed to load notifications");
    }
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
          maxWidth: "800px",
          margin: "40px auto",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            color: "#1e293b",
          }}
        >
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              color: "#64748b",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            No notifications found
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "18px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.08)",

                display: "flex",
                gap: "15px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  background: "#e0e7ff",
                  color: "#2563eb",
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FaBell />
              </div>

              <div>
                <p
                  style={{
                    color: "#334155",
                    marginBottom: "8px",
                  }}
                >
                  {item.message}
                </p>

                <small
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;