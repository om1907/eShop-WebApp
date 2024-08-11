import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify'
import axios from 'axios'

const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');

        //form function
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post('http://localhost:3000/api/v1/auth/register');
            if(res.status===200){
              console.log(res);
              toast.success('User registered successfully');
            }else{
              toast.error('Registration failed ');
            }
            console.log(res);
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in register submit')            
        }
    }

  return (
    <Layout title="Register -Ecommerce App">
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
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

export default Register;
