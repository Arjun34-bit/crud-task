import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS employees(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `;

  try {
    pool.query(queryText);
    console.log("Employees table created successfully");
  } catch (error) {
    console.log("Error creating employees table:", error);
  }
};

export default createUserTable;
