import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleEmployee(id);
    }
  }, [id]);

  const getSingleEmployee = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/get/${id}`);
    if (response.status === 200) {
      setName(response.data.name);
      setEmail(response.data.email);
      setContact(response.data.contact);
    }
  };

  const addEmployee = async (data) => {
    const response = await axios.post("http://localhost:5000/api/post", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateEmployee = async (id, data) => {
    const response = await axios.put(
      `http://localhost:5000/api/edit/${id}`,
      data
    );
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide values into each inputs");
    } else {
      const data = { name, email, contact };
      if (!id) {
        addEmployee(data);
      } else {
        updateEmployee(id, data);
      }
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <h1>{id ? "Update" : "Add"} Employee</h1>
          <NavLink to="/">
            <button type="button" className="btn btn-success">
              Go Back
            </button>
          </NavLink>
        </div>
        <div className="card-body">
          <form noValidate onSubmit={handleFormSubmit} className="w-50 mx-auto">
            <div className="form-group mb-3">
              <input
                className="form-control"
                placeholder="Employee Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                placeholder="Contact Number"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                {id ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
