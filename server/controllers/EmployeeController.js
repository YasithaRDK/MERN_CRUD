import EmployeeModel from "../models/EmployeeModel.js";

export const getEmployees = async (req, res) => {
  const employee = await EmployeeModel.find();
  res.send(employee);
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await EmployeeModel.findById(id);
  res.send(employee);
};

export const postEmployee = async (req, res) => {
  const { name, email, contact } = req.body;
  try {
    await EmployeeModel.create({ name, email, contact });
    res.status(200).json("Employee Added Successfully...");
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err, msg: "Something Went Wrong" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  try {
    await EmployeeModel.findByIdAndUpdate(id, { name, email, contact });
    await EmployeeModel.findById(id);
    res.status(200).json("Employee Updated Successfully...");
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err, msg: "Something Went Wrong" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await EmployeeModel.findByIdAndDelete(id);
    res.status(200).json("Employee Deleted Successfully...");
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err, msg: "Something Went Wrong" });
  }
};
