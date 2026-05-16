function UserModal({
  id,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  password,
  setPassword,
  role,
  setRole,
  errors,
  validateLive,
  saveUser,
  clearForm,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          width: "400px",
          borderRadius: "10px",
        }}
      >
        <h2>
          {id ? "Edit User" : "Add New User"}
        </h2>

        {/* NAME */}
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateLive("name", e.target.value);
          }}
        />

        <br />

        <small style={{ color: "red" }}>
          {errors.name}
        </small>

        <br /><br />

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateLive("email", e.target.value);
          }}
        />

        <br />

        <small style={{ color: "red" }}>
          {errors.email}
        </small>

        <br /><br />

        {/* PHONE */}
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            validateLive("phone", e.target.value);
          }}
        />

        <br />

        <small style={{ color: "red" }}>
          {errors.phone}
        </small>

        <br /><br />

        {/* ADDRESS */}
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            validateLive("address", e.target.value);
          }}
        />

        <br />

        <small style={{ color: "red" }}>
          {errors.address}
        </small>

        <br /><br />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder={
            id
              ? "New Password (optional)"
              : "Password"
          }
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validateLive("password", e.target.value);
          }}
        />

        <br />

        <small style={{ color: "red" }}>
          {errors.password}
        </small>

        <br /><br />

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            validateLive("role", e.target.value);
          }}
        >
          <option value="">Select Role</option>

          <option value="admin">Admin</option>

          <option value="user">User</option>
        </select>

        <br />

        <small style={{ color: "red" }}>
          {errors.role}
        </small>

        <br /><br />

        <button onClick={saveUser}>
          {id ? "Update User" : "Add User"}
        </button>

        {" "}

        <button onClick={clearForm}>
          Close
        </button>
      </div>
    </div>
  );
}

export default UserModal;