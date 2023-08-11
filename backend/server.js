import express from "express";
import cors from "cors";
import sql from "mysql";
const app = express();
import env from "dotenv";
env.config();
const port = process.env.PORT || 3001;
const db_config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

const pool = sql.createPool(db_config);
app.use(express.json());
app.use(cors());

app.get("/test-db-connection", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      res.status(400).json({ message: "Error connecting to the database" });
    } else {
      connection.release();
      res.status(200).json({ message: "Connected to the database" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:3001`);
});

app.post("/addGuest", (req, res) => {
  const { name, id, photo } = req.body;

  const query = "INSERT INTO guestList (Name, ID, Image) VALUES (?, ?, ?)";

  pool.query(query, [name, id, photo], (err, result) => {
    if (err) {
      console.error("Error inserting variable:", err);
      res.status(500).json({ message: "Error inserting variable" });
    } else {
      console.log("Variable inserted successfully!");
      res.status(200).json({ message: "Variable inserted successfully" });
    }
  });
});

app.put("/updateGuest", (req, res) => {
  // Using HTTP PUT method for updates
  const { name, id, photo } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID is required for updating." });
  }
  const query = "UPDATE guestList SET Name = ?, Image = ? WHERE ID = ?";
  pool.query(query, [name, photo, id], (err, result) => {
    if (err) {
      console.error("Error updating variable:", err);
      res.status(500).json({ message: "Error updating variable" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Guest not found" });
      } else {
        console.log("Variable updated successfully!");
        res.status(200).json({ message: "Variable updated successfully" });
      }
    }
  });
});

app.get("/get-all-guests", (req, res) => {
  const query = "SELECT Name, ID, Image FROM guestList";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching guests:", err);
      res.status(500).json({ message: "Error fetching guests" });
    } else {
      const guests = result;
      res.status(200).json(guests);
    }
  });
});

app.delete("/delete-guest/:id", (req, res) => {
  const guestId = req.params.id;
  console.log(guestId);

  const query = "DELETE FROM guestList WHERE ID = ?";

  pool.query(query, [guestId], (err, result) => {
    if (err) {
      console.error("Error deleting guest:", err);
      res.status(500).json({ message: "Error deleting guest" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Item not found" });
      } else {
        console.log("Guest deleted successfully!");
        res.status(200).json({ message: "Guest deleted successfully" });
      }
    }
  });
});
