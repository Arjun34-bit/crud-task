import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";

import empRoutes from "./routes/empRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/employees", empRoutes);

//Error Handling Middleware
app.use(errorHandling);

//Table Creation
createUserTable();

//Postgres
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The Database name is : ${result.rows[0].current_database}`);
});

//Server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
