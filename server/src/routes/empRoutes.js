import express from "express";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controllers/empController.js";
import validateEmp from "../middleware/inputValidator.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/add", validateEmp, addEmployee);
router.delete("/delete", deleteEmployee);
router.put("/update/:id", validateEmp, updateEmployee);

export default router;
