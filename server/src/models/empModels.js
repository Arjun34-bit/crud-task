import pool from "../config/db.js";

export const getAllEmployeesService = async () => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    return result.rows;
  } catch (error) {
    console.error("Error fetching all employee:", error);
    throw error;
  }
};
export const addEmployeeService = async (data) => {
  try {
    const result = await pool.query(
      "INSERT INTO employees (name, department, email, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.name, data.department, data.email, data.role]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error in adding employees:", error);
    throw error;
  }
};

export const deleteEmployeeService = async (delData) => {
  try {
    let result;
    if (delData.length === 1) {
      result = await pool.query(
        "DELETE FROM employees WHERE id = $1 RETURNING *",
        [delData[0]]
      );

      return result.rows[0];
    }

    if (delData.length > 1) {
      result = await pool.query(
        "DELETE FROM employees WHERE id = ANY($1) RETURNING *",
        [delData]
      );

      return result.rows;
    }
  } catch (error) {
    console.error("Error deleting employees:", error);
    throw error;
  }
};

export const updateEmployeService = async (id, data) => {
  try {
    const result = await pool.query(
      "UPDATE employees SET name=$1, department=$2, email=$3, role=$4 WHERE id=$5 RETURNING *",
      [data.name, data.department, data.email, data.role, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};
