import React, { useState } from "react";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

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

  return (
    <div>
      <h1>{editMode ? "Edit User" : "Create New User"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Photo URL:
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </label>
        <button type="submit">{editMode ? "Update User" : "Add User"}</button>
      </form>

      <h1>User List</h1>
      {users.map((user, index) => (
        <div key={index}>
          <h2>{user.name}</h2>
          <p>{user.address}</p>
          <img src={user.photo} alt={user.name} />
          <button onClick={() => handleEdit(index)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default UserPage;
