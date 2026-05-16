import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "13px",
    border: "1px solid #d6d3d1",
    borderRadius: "8px",
    outline: "none",
    marginTop: "6px",
    marginBottom: "18px",
    fontSize: "14px",
    background: "#fafaf9",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        background: "#f5f5f4",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "360px",
          padding: "40px",
          borderRadius: "14px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.06)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#44403c",
            fontWeight: "600",
          }}
        >
          Login
        </h1>

        {/* EMAIL */}
        <div>
          <label
            style={{
              color: "#57534e",
              fontSize: "14px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label
            style={{
              color: "#57534e",
              fontSize: "14px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={loginUser}
          style={{
            width: "100%",
            padding: "13px",
            background: "#0a0705",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            marginTop: "5px",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;