import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    if (response.status === 200) {
      setEmployees(response.data);
    }
  };

  const onDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete that user")) {
      const response = await axios.delete(
        `http://localhost:5000/api/delete/${id}`
      );
      if (response.status === 200) {
        toast.success(response.data);
        getEmployees();
      }
    }
  };
  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <h1>Employee List</h1>
          <NavLink to="/add">
            <button type="button" className="btn btn-primary">
              ADD [+]
            </button>
          </NavLink>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map((employee, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.contact}</td>
                      <td>
                        <NavLink to={`/update/${employee._id}`}>
                          <button className="btn btn-success me-2">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => onDeleteEmployee(employee._id)}
                        >
                          Delete
                        </button>
                        <NavLink to={`/view/${employee._id}`}>
                          <button className="btn btn-info">View</button>
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
