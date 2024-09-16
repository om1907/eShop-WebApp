import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [answer,setAnswer]=useState();
    const navigate = useNavigate();
        //form function
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post('/api/v1/auth/register',{name,email,password,confirmPassword,answer});
            console.log(res);
            if(res.status===201){
              toast.success(`${res.data.message} , Redirecting to Login page ...`);
              setTimeout(() => {
                navigate('/login');
              }, 3000);
            }else{
              toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in register submit')            
        }
    }

  return (
    <Layout title="Register -Ecommerce App">
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Register </h4>
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
            <label htmlFor="exampleInputPassword1" className="form-label">
              Secret Key
            </label>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              required
              placeholder="What is your favourite sport"
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
