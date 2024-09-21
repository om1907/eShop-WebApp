import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const ForgotPassword = () => {
  const [email, setEmail] = useState()
  const [answer, setAnswer] = useState()
  const [newPassword, setNewPassword] = useState()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/v1/auth/forgot-password', {
        email,
        newPassword,
        answer,
      })
      console.log(res.message);
      if (res.status === 200) {
        toast.success(res.data.message)
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } else {
        throw `Error in Forgot Password`;
      }
    } catch (error) {
      console.log('Error in catch block of forgot password');
    }
  }
  return (
    <Layout title="Forgot password -Ecommerce App">
      <div className="register">
        <form onSubmit={handleSubmit}>
          {/* <h4 className="title">Forgot Password</h4> */}
          <div className="mb-2">
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
          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Answer Key
            </label>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="What is your fav. sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
