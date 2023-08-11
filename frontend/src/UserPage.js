import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserPage.css";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-all-guests`);
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any of the fields are empty
    if (!name || !id || !photo) {
      alert("All fields are required!");
      return;
    }

    const user = {
      name,
      id,
      photo,
    };

    try {
      if (editMode) {
        // Updating an existing user
        const response = await axios.put(
          `http://localhost:3001/updateGuest`,
          user
        );
        if (response.status === 200) {
          const updatedUserList = [...users];
          updatedUserList[editIndex] = response.data; // Assuming the server returns the updated user
          setUsers(updatedUserList);
          alert("Guest updated successfully!");
        } else {
          alert("Error updating user.");
        }
      } else {
        // Adding a new user
        const response = await axios.post(
          `http://localhost:3001/addGuest`,
          user
        );
        setUsers((prevUsers) => [...prevUsers, response.data]);
        alert("Guest added successfully!");
      }

      // Reset form and mode
      setName("");
      setId("");
      setPhoto("");
      setEditMode(false);
      setEditIndex(null);
      fetchData();
    } catch (error) {
      console.error("There was an error:", error);
      alert(
        editMode
          ? "There was an error updating the user. Please try again."
          : "There was an error saving the user. Please try again."
      );
    }
  };

  const handleEdit = (index) => {
    setName(users[index].Name);
    setId(users[index].ID);
    setPhoto(users[index].Image);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      console.log(users[index].ID);
      await axios.delete(
        `http://localhost:3001/delete-guest/${users[index].ID}`
      ); // Assuming each user has an id
      const newUsers = [...users];
      newUsers.splice(index, 1);
      setUsers(newUsers);
      alert("Guest deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the user:", error);
      alert("There was an error deleting the user. Please try again.");
    }
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
          Id:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
          <h2>{user.Name}</h2>
          <p>{user.ID}</p>
          <img src={user.Image} alt={user.name} />
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
