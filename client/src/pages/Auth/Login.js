import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import {useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/auth/login`, {
        email,
        password,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(`${res.data.message}, redirecting to home page...`);
        setTimeout(() => {
          navigate('/')
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Login page");
    }
  };

  return (
    <Layout title="Register -Ecommerce App">
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
