import { useState } from "react";
import axios from "axios";
import TopBar from "../components/TopBar";

function MyProfile() {
  const token = localStorage.getItem("token");

  const savedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [name, setName] = useState(
    savedUser.name
  );

  const [email, setEmail] = useState(
    savedUser.email
  );

  const [phone, setPhone] = useState(
    savedUser.phone
  );

  const [address, setAddress] = useState(
    savedUser.address
  );

  const [errors, setErrors] = useState({});

  const validateLive = (field, value) => {
    let newErrors = { ...errors };

    const data = {
      name,
      email,
      phone,
      address,
      [field]: value,
    };

    if (!data.name.trim()) {
      newErrors.name = "Name required";
    } else {
      delete newErrors.name;
    }

    if (!data.email.trim()) {
      newErrors.email = "Email required";
    } else if (
      !/\S+@\S+\.\S+/.test(data.email)
    ) {
      newErrors.email = "Invalid email";
    } else {
      delete newErrors.email;
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone required";
    } else {
      delete newErrors.phone;
    }

    if (!data.address.trim()) {
      newErrors.address = "Address required";
    } else {
      delete newErrors.address;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    const ok = validateLive("name", name);

    if (!ok) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/my-profile/update",
        {
          name,
          email,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Profile Updated");
    } catch {
      alert("Update Failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    marginTop: "6px",
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
          maxWidth: "600px",
          margin: "40px auto",
          background: "white",
          padding: "35px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#1e293b",
            marginBottom: "30px",
          }}
        >
          My Profile
        </h1>

        {/* NAME */}
        <div style={{ marginBottom: "20px" }}>
          <label>Name</label>

          <input
            style={inputStyle}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateLive(
                "name",
                e.target.value
              );
            }}
          />

          <small style={{ color: "red" }}>
            {errors.name}
          </small>
        </div>

        {/* EMAIL */}
        <div style={{ marginBottom: "20px" }}>
          <label>Email</label>

          <input
            style={inputStyle}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateLive(
                "email",
                e.target.value
              );
            }}
          />

          <small style={{ color: "red" }}>
            {errors.email}
          </small>
        </div>

        {/* PHONE */}
        <div style={{ marginBottom: "20px" }}>
          <label>Phone</label>

          <input
            style={inputStyle}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validateLive(
                "phone",
                e.target.value
              );
            }}
          />

          <small style={{ color: "red" }}>
            {errors.phone}
          </small>
        </div>

        {/* ADDRESS */}
        <div style={{ marginBottom: "25px" }}>
          <label>Address</label>

          <input
            style={inputStyle}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              validateLive(
                "address",
                e.target.value
              );
            }}
          />

          <small style={{ color: "red" }}>
            {errors.address}
          </small>
        </div>

        <button
          onClick={updateProfile}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default MyProfile;