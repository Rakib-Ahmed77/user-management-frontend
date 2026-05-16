import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../components/TopBar";
import UserModal from "../components/UserModal";

function Users() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setUsers(res.data);
    } catch {
      alert("Failed to load users");
    }
  };

  const validateLive = (
    field,
    value,
    current = {
      name,
      email,
      phone,
      address,
      password,
      role,
    }
  ) => {
    let newErrors = { ...errors };

    const data = { ...current, [field]: value };

    // NAME
    if (!data.name.trim()) {
      newErrors.name = "Name required";
    } else {
      delete newErrors.name;
    }

    // EMAIL
    if (!data.email.trim()) {
      newErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email";
    } else {
      delete newErrors.email;
    }

    // PHONE
    if (!data.phone.trim()) {
      newErrors.phone = "Phone required";
    } else {
      delete newErrors.phone;
    }

    // ADDRESS
    if (!data.address.trim()) {
      newErrors.address = "Address required";
    } else {
      delete newErrors.address;
    }

    // PASSWORD
    if (!id) {
      if (!data.password.trim()) {
        newErrors.password = "Password required";
      } else if (data.password.length < 6) {
        newErrors.password =
          "Minimum 6 characters";
      } else {
        delete newErrors.password;
      }
    }

    // ROLE
    if (!data.role.trim()) {
      newErrors.role = "Role required";
    } else {
      delete newErrors.role;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setId(null);

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPassword("");
    setRole("");

    setErrors({});

    setShowModal(false);
  };

  const openAddModal = () => {
    clearForm();
    setShowModal(true);
  };

  const saveUser = async () => {
    const ok = validateLive("name", name);

    if (!ok) return;

    const data = {
      name,
      email,
      phone,
      address,
      role,
    };

    if (password) {
      data.password = password;
    }

    try {
      // UPDATE
      if (id) {
        await axios.put(
          `http://localhost:8000/api/users/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        alert("User Updated");
      }

      // CREATE
      else {
        await axios.post(
          "http://localhost:8000/api/users",
          {
            ...data,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        alert("User Added");
      }

      clearForm();

      loadUsers();
    } catch {
      alert("Operation Failed");
    }
  };

  const editUser = (user) => {
    setShowModal(true);

    setId(user.id);

    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setRole(user.role);

    setPassword("");

    setErrors({});
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      loadUsers();
    } catch {
      alert("Delete Failed");
    }
  };

  const thStyle = {
    padding: "16px",
    textAlign: "left",
    color: "#334155",
    fontWeight: "600",
  };

  const tdStyle = {
    padding: "16px",
    color: "#475569",
  };

  return (
    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <TopBar />

      <div style={{ padding: "35px" }}>
        {/* TOP SECTION */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#1e293b",
                marginBottom: "5px",
              }}
            >
              Users
            </h1>

            <p
              style={{
                color: "#64748b",
              }}
            >
              Manage all system users
            </p>
          </div>

          <button
            onClick={openAddModal}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            + Add User
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            marginBottom: "25px",
            padding: "12px",
            width: "320px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            outline: "none",
            background: "white",
          }}
        />

        {/* TABLE */}
        <div
          style={{
            overflowX: "auto",
            background: "white",
            borderRadius: "14px",
            boxShadow:
              "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                background: "#f8fafc",
                borderBottom:
                  "1px solid #e2e8f0",
              }}
            >
              <tr>
                <th style={thStyle}>ID</th>

                <th style={thStyle}>Name</th>

                <th style={thStyle}>Email</th>

                <th style={thStyle}>Role</th>

                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users
                .filter((user) => {
                  return (
                    user.name
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      ) ||
                    user.email
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      )
                  );
                })
                .map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom:
                        "1px solid #f1f5f9",
                    }}
                  >
                    <td style={tdStyle}>
                      {user.id}
                    </td>

                    <td style={tdStyle}>
                      {user.name}
                    </td>

                    <td style={tdStyle}>
                      {user.email}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            user.role ===
                            "admin"
                              ? "#fee2e2"
                              : "#dcfce7",

                          color:
                            user.role ===
                            "admin"
                              ? "#b91c1c"
                              : "#15803d",

                          padding:
                            "6px 12px",

                          borderRadius:
                            "20px",

                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <button
                        onClick={() =>
                          editUser(user)
                        }
                        style={{
                          background:
                            "#2563eb",

                          color: "white",

                          border: "none",

                          padding:
                            "8px 14px",

                          borderRadius:
                            "6px",

                          cursor: "pointer",

                          marginRight:
                            "10px",

                          fontWeight:
                            "500",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteUser(
                            user.id
                          )
                        }
                        style={{
                          background:
                            "#ef4444",

                          color: "white",

                          border: "none",

                          padding:
                            "8px 14px",

                          borderRadius:
                            "6px",

                          cursor: "pointer",

                          fontWeight:
                            "500",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <UserModal
          id={id}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          errors={errors}
          validateLive={validateLive}
          saveUser={saveUser}
          clearForm={clearForm}
        />
      )}
    </div>
  );
}

export default Users;