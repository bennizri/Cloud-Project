import React, { useState } from "react";
import "./UserPage.css";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any of the fields are empty
    if (!name || !address || !photo) {
      alert("All fields are required!");
      return;
    }

    if (editMode) {
      const newUserList = [...users];
      newUserList[editIndex] = { name, address, photo };
      setUsers(newUserList);
      setEditMode(false);
      setEditIndex(null);
    } else {
      const newUser = {
        name,
        address,
        photo,
      };

      setUsers([...users, newUser]);
    }

    // Reset form
    setName("");
    setAddress("");
    setPhoto("");
  };

  const handleEdit = (index) => {
    setName(users[index].name);
    setAddress(users[index].address);
    setPhoto(users[index].photo);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const commonStyle = {
    fontfamily: "Noto Sans",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "10px",
    marginBottom: "20px",
  };

  const inputStyle = {
    fontfamily: "Noto Sans",
    width: "200px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    fontFamily: "Noto Sans",
  };

  const userStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    img: {
      width: "50px",
      height: "50px",
      objectFit: "cover",
    },
  };

  return (
    <div style={{ ...commonStyle, maxWidth: "600px", marginLeft: "20px" }}>
      <h1>Guest List</h1>
      <h1>{editMode ? "Edit User" : "Register a new guest"}</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Photo URL:
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          {editMode ? "Update User" : "Add Guest"}
        </button>
      </form>

      <h1>List</h1>
      {users.map((user, index) => (
        <div key={index} style={userStyle}>
          <h2>{user.name}</h2>
          <p>{user.address}</p>
          <img src={user.photo} alt={user.name} />
          <div>
            <button onClick={() => handleEdit(index)} style={buttonStyle}>
              Edit
            </button>
            <button onClick={() => handleDelete(index)} style={buttonStyle}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPage;
