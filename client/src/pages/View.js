import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function View() {
  const [employee, setEmployee] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleEmployee(id);
    }
  }, [id]);

  const getSingleEmployee = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/get/${id}`);
    if (response.status === 200) {
      setEmployee(response.data);
    }
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <h1>Employee Details</h1>
          <NavLink to="/">
            <button type="button" className="btn btn-success">
              Go Back
            </button>
          </NavLink>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">Employee Id</h5>
          <p className="card-text">{id}</p>
          <h5 className="card-title">Employee Name</h5>
          <p className="card-text">{employee && employee.name}</p>
          <h5 className="card-title">Employee Email</h5>
          <p className="card-text">{employee && employee.email}</p>
          <h5 className="card-title">Employee Contact</h5>
          <p className="card-text">{employee && employee.contact}</p>
        </div>
      </div>
    </div>
  );
}
