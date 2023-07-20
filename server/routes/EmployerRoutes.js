import { Router } from "express";
import {
  deleteEmployee,
  getEmployee,
  getEmployees,
  postEmployee,
  updateEmployee,
} from "../controllers/EmployeeController.js";

const router = Router();

router.get("/get", getEmployees);
router.post("/post", postEmployee);
router.get("/get/:id", getEmployee);
router.put("/edit/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;
