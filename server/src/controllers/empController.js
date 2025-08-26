import {
  addEmployeeService,
  deleteEmployeeService,
  getAllEmployeesService,
  updateEmployeService,
} from "../models/empModels.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const addEmployee = async (req, res, next) => {
  try {
    const data = req.body;
    const newEmployee = await addEmployeeService(data);
    handleResponse(res, 201, "Employee record added successfully", newEmployee);
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await getAllEmployeesService();
    handleResponse(res, 201, "Employees retrieved successfully", employees);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const delData = req.body;
    const deletedEmployees = await deleteEmployeeService(delData);
    handleResponse(
      res,
      201,
      "Employees deleted successfully",
      deletedEmployees
    );
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedEmployee = await updateEmployeService(id, data);
    handleResponse(res, 200, "Employee updated successfully", updatedEmployee);
  } catch (error) {
    next(error);
  }
};
