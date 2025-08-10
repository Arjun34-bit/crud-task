import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
console.log("API URL:", apiUrl);

export const getAllEmpRecords = async () => {
  try {
    const data = await axios.get(`${apiUrl}/employees/`);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployeeRecord = async (empData) => {
  try {
    const data = await axios.post(`${apiUrl}/employees/add`, empData);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployeeRecord = async (id, empData) => {
  try {
    const data = await axios.put(`${apiUrl}/employees/update/${id}`, empData);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployeeRecord = async (empId) => {
  try {
    console.log("Deleting employee with ID:", empId);
    const response = await axios.delete(`${apiUrl}/employees/delete/`, {
      data: empId,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
