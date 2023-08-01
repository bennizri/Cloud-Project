import express from "express";
import cors from "cors";
import sql from "mysql";
const app = express();
import env from "dotenv";
env.config();
const port = process.env.PORT || 3000;
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
